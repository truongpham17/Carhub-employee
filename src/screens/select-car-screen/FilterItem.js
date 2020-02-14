import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RemoveIcon } from 'assets/svg';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  label: String,
  onRemovePress: () => void,
};

const SettingScreen = ({ label, onRemovePress }: PropTypes) => (
  <View style={styles.container}>
    <Text style={textStyle.bodyText}>{label}</Text>
    <TouchableOpacity onPress={onRemovePress}>
      <RemoveIcon />
    </TouchableOpacity>
  </View>
);
export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    height: 32,
    backgroundColor: colors.dark40,
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});
