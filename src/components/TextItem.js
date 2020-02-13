import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themeType } from 'types/theme';
import { Tick } from 'Assets/svgs';
import { textStyleObject } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import Button from './Button';

type PropTypes = {
  theme: themeType,
  content: string,
  haveTick?: boolean,
};

const TextItem = ({ theme, content, haveTick = true }: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {haveTick && <Tick fill={theme.success} />}
        {haveTick && '  '}
        {content}
      </Text>
    </View>
  );
};

export default TextItem;

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      ...textStyleObject.bodyText,
      color: theme.dark40,
      marginTop: scaleVer(8),
    },
  });
}
