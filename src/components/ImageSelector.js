import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { themeType } from 'types/theme';
import { ViewContainer } from 'Component';
import { withTheme } from 'Component/ThemeProvider';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { Remove, AddImage } from 'Assets/svgs';
import { shadowStyle } from 'Constants';
import { textStyle, textStyleObject } from 'Constants/textStyles';

type PropTypes = {
  theme: themeType,
  style: StyleProp<ViewStyle>,
  data?: { uri: string, key: string },
  onRemovePress?: () => void,
  onAddPress: () => void,
};

const ImageSelector = ({
  theme,
  style,
  data,
  onRemovePress,
  onAddPress,
}: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));
  const handleRemovePress = () => {
    onRemovePress(data.key);
  };
  if (!data) {
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.empty} onPress={onAddPress}>
          <AddImage />
          <Text style={styles.text}>THÊM HÌNH</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.img}>
        <Image
          source={{ uri: data.uri }}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity style={styles.remove} onPress={handleRemovePress}>
        <Remove />
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

function getStyles(theme: themeType) {
  return StyleSheet.create({
    img: {
      flex: 1,
      borderRadius: 4,
      ...shadowStyle.ELEVATION_3,
    },
    container: {
      width: scaleHor(130),
      height: scaleHor(130),
      padding: scaleHor(10),
    },
    remove: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    empty: {
      flex: 1,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.dark80,
    },
    text: {
      ...textStyleObject.bodyTextBold,
      fontSize: 10,
      color: theme.white,
      marginTop: scaleVer(8),
    },
  });
}
