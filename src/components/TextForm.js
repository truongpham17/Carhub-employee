import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { themeType } from 'types/theme';
import { scaleVer, scaleHor, scale } from 'Constants/dimensions';
import { Calendar, DownArrow, UpArrow } from 'Assets/svgs';
import { defaultFunction } from 'Utils/common';
import { shadowStyle } from 'Constants';
import LinearGradient from 'react-native-linear-gradient';
import { pure } from 'recompose';

type PropTypes = {
  label: string,
  value: string,
  onChangeText: string => void,
  multiline: boolean,
  containerStyle: StyleProp<ViewStyle>,
  textInputStyle: StyleProp<ViewStyle>,
  theme: themeType,
  placeholder?: string,
  type: 'textinput' | 'calendar' | 'dropdown',
  onAction?: () => void,
  dropDownList?: [{ value: string, key: number }],
  showDropList?: boolean,
  onDropItemPress: string => void,
  selectedItem: string,
  autoFocus?: boolean,
  error?: string,
};

const TextForm = ({
  label,
  value,
  onChangeText,
  multiline,
  containerStyle,
  textInputStyle,
  theme,
  placeholder,
  type = 'textinput',
  onAction = defaultFunction,
  dropDownList = [],
  showDropList = false,
  onDropItemPress,
  selectedItem,
  autoFocus = false,
  error,
}: PropTypes) => {
  const { current: styles } = useRef(getStyles(theme));
  const [inputHover, setInputHover] = useState(false);
  const handleTextInputFocus = () => {
    setInputHover(true);
  };
  const handleTextInputBlur = () => {
    setInputHover(false);
  };
  const renderDropItem = (item, index) => (
    <TouchableOpacity
      style={[
        styles.dropDownItem,
        index === dropDownList.length - 1 ? { borderBottomWidth: 0 } : {},
      ]}
      onPress={() => onDropItemPress(item.key)}
      key={item.key}
    >
      {item.key === selectedItem ? (
        <LinearGradient
          style={styles.selectedContainer}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={[theme.primaryLight, theme.primary]}
          locations={[0, 1]}
        >
          <Text style={styles.selectedText}>{item.value}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.text}>{item.value}</Text>
      )}
    </TouchableOpacity>
  );
  const renderContent = () => {
    switch (type) {
      case 'textinput':
        return (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.textInput,
              textInputStyle,
              multiline ? { paddingTop: scaleVer(8) } : {},
              error ? styles.error : {},
              inputHover ? { borderColor: theme.primary } : {},
            ]}
            multiline={multiline}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
          />
        );
      case 'calendar':
        return (
          <TouchableOpacity style={styles.contentContainer} onPress={onAction}>
            <Text style={styles.text}>{value}</Text>
            <Calendar />
          </TouchableOpacity>
        );
      case 'dropdown':
        return (
          <TouchableOpacity
            style={{ backgroundColor: 'white' }}
            onPress={onAction}
          >
            <View
              style={[
                styles.contentContainer,
                showDropList
                  ? { borderBottomStartRadius: 0, borderBottomEndRadius: 0 }
                  : {},
              ]}
            >
              <Text style={styles.text}>{value}</Text>
              <DownArrow />
            </View>
            {showDropList && (
              <View style={styles.dropDownList}>
                {dropDownList.map((item, index) => renderDropItem(item, index))}
              </View>
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  return (
    <View style={[containerStyle, type === 'dropdown' ? { zIndex: 2 } : {}]}>
      <Text style={styles.label}>{label}</Text>
      {renderContent()}
    </View>
  );
};
export default pure(TextForm);

function getStyles(theme: themeType) {
  return StyleSheet.create({
    container: {},
    textInput: {
      paddingHorizontal: scaleHor(8),
      height: scaleHor(44),
      borderRadius: 4,
      borderWidth: 1,
      ...textStyleObject.bodyText,
      color: theme.dark20,
      borderColor: theme.dark60,
    },
    label: {
      ...textStyleObject.label,
      color: theme.dark20,
      marginBottom: scaleVer(4),
    },
    contentContainer: {
      paddingHorizontal: scaleHor(8),
      height: scaleHor(44),
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.dark60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropDownItem: {
      paddingHorizontal: scaleHor(16),
      height: scaleHor(44),

      borderColor: theme.dark60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
    dropDownList: {
      backgroundColor: 'white',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      overflow: 'hidden',
      borderBottomWidth: 1,
      borderStartWidth: 1,
      borderEndWidth: 1,
      borderColor: theme.dark60,
    },
    text: {
      ...textStyleObject.bodyText,
      color: theme.dark20,
    },
    selectedText: {
      ...textStyleObject.bodyText,
      color: theme.white,
    },
    selectedContainer: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'stretch',
      marginHorizontal: -scaleHor(16),
      paddingHorizontal: scaleHor(16),
    },
    error: {
      borderColor: theme.primary,
    },
  });
}
