import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { themeType } from 'types/theme';
import { withTheme } from './ThemeProvider';

type PropTypes = {
  theme: themeType,
  style: StyleProp<ViewStyle> | [StyleProp<ViewStyle>],
};

const TextTheme = ({ theme, style, ...props }: PropTypes) => {
  let stylePlain = null;
  if (Array.isArray(style)) {
    for (let i = 0; i < style.length; i++) {
      stylePlain = { ...stylePlain, ...style[i] };
    }
  } else {
    stylePlain = style;
  }
  return (
    <Text {...props} style={[stylePlain, { color: theme[stylePlain.color] }]} />
  );
};

export default withTheme(TextTheme);
