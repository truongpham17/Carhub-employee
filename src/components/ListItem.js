import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { themeType } from 'types/theme';
import { defaultFunction } from 'Utils/common';
import { scaleHor } from 'Constants/dimensions';
import { getSvg } from 'Assets/svgs';
import { textStyle, textStyleObject } from 'Constants/textStyles';

type PropTypes = {
  theme: themeType,
  icon?: string,
  label?: string,
  nextIcon?: string,
  onItemPress?: () => void,
  showSeparator?: boolean,
  type: 'text' | 'toggle' | 'detail',
  detail?: string,
  pressable?: boolean,
  containerStyle: StyleProp<ViewStyle>,
};

const ListItem = ({
  theme,
  icon,
  label = '',
  nextIcon,
  onItemPress = defaultFunction,
  showSeparator = false,
  type = 'text',
  detail,
  containerStyle,
  pressable = true,
}: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));

  const getAction = () => {
    switch (type) {
      case 'text':
        return getSvg(nextIcon, { fill: theme.dark20 });
      case 'toggle':
        return <Switch value />;
      case 'detail':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.detail}>{detail}</Text>
            {getSvg(nextIcon, { fill: theme.dark20 })}
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        showSeparator ? styles.separator : {},
        containerStyle,
      ]}
      onPress={onItemPress}
      disabled={!pressable}
    >
      <View style={styles.labelContainer}>
        {icon && (
          <View style={{ marginEnd: scaleHor(16), width: scaleHor(16) }}>
            {getSvg(icon, { fill: theme.dark20 })}
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      {getAction()}
    </TouchableOpacity>
  );
};

export default ListItem;

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      height: scaleHor(60),
      paddingHorizontal: scaleHor(8),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    },
    label: {
      ...textStyle.bodyTextBold,
      color: theme.dark20,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detail: {
      ...textStyleObject.bodyText,
      color: theme.dark20,
      marginEnd: scaleHor(8),
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.dark90,
    },
  });
}
