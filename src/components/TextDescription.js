import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { themeType } from 'types/theme';
import { textStyleObject } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';

type textItemType = {
  value: string,
  type: 'normal' | 'underline',
};

type PropTypes = {
  data: [textItemType],
  theme: themeType,
  marginTop?: boolean,
};

const TextDescription = ({ data, theme, marginTop }: PropTypes) => {
  const styles = getStyles(theme);
  const renderTextItem = (item: textItemType, index) => {
    if (item.type === 'normal') {
      return item.value;
    }
    return (
      <Text style={styles.textHighLight} key={index}>
        {item.value}
      </Text>
    );
  };
  return (
    <Text style={[styles.text, marginTop ? { marginTop: scaleVer(8) } : {}]}>
      {data.map(renderTextItem)}
    </Text>
  );
};

function getStyles(theme: themeType) {
  return StyleSheet.create({
    text: {
      color: theme.dark40,
      ...textStyleObject.bodyText,
      lineHeight: scaleHor(20),
    },
    textHighLight: {
      textDecorationLine: 'underline',
      ...textStyleObject.bodyTextBold,
    },
  });
}

export default TextDescription;
