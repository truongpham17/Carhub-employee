import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { themeType } from 'types/theme';
import LinearGradient from 'react-native-linear-gradient';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { getSvg } from 'Assets/svgs';

type PropTypes = {
  onPress: () => void,
  label: string,
  gradient?: boolean,
  colorStart?: string,
  colorEnd?: string,
  theme: themeType,
  style: StyleProp<ViewStyle>,
  textColor: string,
  iconOnly?: boolean,
  icon?: string,
  leftIcon?: string,
  disable?: boolean,
};

const Button = ({
  theme,
  onPress,
  label = '',
  gradient = true,
  colorStart = theme.primaryLight,
  colorEnd = theme.primary,
  style,
  textColor = theme.white,
  iconOnly = false,
  icon = null,
  leftIcon = null,
  disable = false,
}: PropTypes) => {
  const buttonLabel = label.toUpperCase();
  if (gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ alignSelf: 'stretch' }}
        disabled={disable}
      >
        <LinearGradient
          style={[styles.container, style]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={
            disable ? [theme.dark90, theme.dark80] : [colorStart, colorEnd]
          }
          locations={[0, 1]}
        >
          {!iconOnly && (
            <Text style={[textStyle.label, { color: textColor }]}>
              {buttonLabel}
            </Text>
          )}
          {getSvg(icon)}
          {leftIcon && <View style={styles.leftIcon}>{getSvg(leftIcon)}</View>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disable}
    >
      {!iconOnly && (
        <Text style={[textStyle.label, { color: textColor }]}>
          {buttonLabel}
        </Text>
      )}
      {getSvg(icon)}
      {leftIcon && <View style={styles.leftIcon}>{getSvg(leftIcon)}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHor(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleHor(22),
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  leftIcon: {
    left: scaleHor(16),
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default Button;
