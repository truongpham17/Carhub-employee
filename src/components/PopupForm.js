import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { FadedContainer, TextForm, Button, ModalContainer } from 'Component';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { themeType } from 'types/theme';
import { textStyle } from 'Constants/textStyles';
import { EditIcon, X, getSvg } from 'Assets/svgs';
import { getBehavior, defaultFunction } from 'Utils/common';

type PropTypes = {
  theme: themeType,
  visible: boolean,
  title: string,
  onClose: () => void,
  children: React.Node,
  leftIcon?: string,
  haveCloseIcon?: boolean,
};

const PopupForm = ({
  theme,
  visible,
  title,
  onClose = defaultFunction,
  children,
  leftIcon,
  haveCloseIcon = true,
}: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));
  return (
    <ModalContainer modalVisible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={{ flexDirection: 'row' }}>
            {leftIcon && getSvg(leftIcon)}
            <Text
              style={[styles.textTitle, leftIcon ? {} : { marginStart: 0 }]}
            >
              {title}
            </Text>
          </View>
          {haveCloseIcon && (
            <TouchableOpacity style={styles.x} onPress={onClose}>
              <X />
            </TouchableOpacity>
          )}
        </View>
        {children}
      </View>
    </ModalContainer>
  );
};

export default PopupForm;

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: scaleHor(16),
      paddingVertical: scaleVer(16),
      alignSelf: 'stretch',
      borderRadius: 4,
      backgroundColor: theme.white,
      marginHorizontal: scaleHor(16),
    },

    x: {
      padding: scaleHor(4),
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scaleVer(24),
      justifyContent: 'space-between',
    },
    textTitle: {
      ...textStyle.widgetItem,
      color: theme.dark,
      marginStart: scaleHor(4),
    },
  });
}
