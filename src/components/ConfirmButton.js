import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp } from 'react-native';
import { color, dimension } from 'Constants';
import LinearGradient from 'react-native-linear-gradient';
import { themeType } from 'types/theme';
import { textStyle } from 'Constants/textStyles';
import Text from './TextTheme';
import { withTheme } from './ThemeProvider';

type PropTypes = {
  label: string,
  onPress: () => void,
  style: StyleProp,
  size?: 'normal' | 'big',
  disabled?: boolean,
  theme: themeType,
};

const ConfirmButton = ({
  label,
  onPress,
  style,
  size,
  disabled,
  theme = {},
}: PropTypes) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <LinearGradient
      style={[
        size === 'normal' ? styles.button : styles.buttonBig,
        { ...style },
      ]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={['#fc6767', '#ec008c']}
      locations={[0, 1]}
    >
      <Text
        style={[
          size === 'normal' ? textStyle.text3 : textStyle.text4SmallRegular,
          { color: 'WHITE' },
        ]}
      >
        {label}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

ConfirmButton.defaultProps = {
  size: 'normal',
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    width: 112,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dimension.DISTANCE_4,
    alignSelf: 'center',
    // backgroundColor: color.NEUTRAL_COLOR_WHITE,
  },
  buttonBig: {
    width: 160,
    height: 32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dimension.DISTANCE_4,
    alignSelf: 'center',
    // backgroundColor: color.NEUTRAL_COLOR_WHITE,
  },
  disable: {},
  disableText: {},
});

export default ConfirmButton;
