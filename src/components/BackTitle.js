import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { dimension } from 'Constants';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { ArrowReturn, getSvg, X } from 'Assets/svgs';
import { themeType } from 'types/theme';
import { scaleVer } from 'Constants/dimensions';
import { popStack } from 'Utils/Navigation';
import Text from './TextTheme';

type PropTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  previous?: string,
  componentId: string,
  animation: 'leftToRight' | 'normal',
  backType: 'back' | 'exit',
  onBackPress: () => void,
  theme: themeType,
};

const BackTitle = ({
  title,
  haveBack,
  haveRight,
  rightIcon,
  onRightPress,
  onBackPress,
  theme,
  backType = 'back',
}: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));

  return (
    <View style={styles.title}>
      {haveBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.arrow}>
          {backType === 'back' ? <ArrowReturn fill={theme.dark20} /> : <X />}
        </TouchableOpacity>
      )}
      <Text style={styles.titleText}>{title}</Text>

      {haveRight && (
        <TouchableOpacity style={styles.rightComponent} onPress={onRightPress}>
          {getSvg(rightIcon)}
        </TouchableOpacity>
      )}
    </View>
  );
};
function getStyles(theme: themeType) {
  return StyleSheet.create({
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      marginBottom: scaleVer(32),
    },
    arrow: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    },
    rightComponent: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      padding: 8,
    },
    titleText: {
      ...textStyleObject.widgetItem,
      color: theme.dark20,
    },
  });
}

export default BackTitle;
