import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { SafeAreaView } from 'react-navigation';
import InputForm from './InputForm';
import ModalContainer from './ModalContainer';

type PropTypes = {
  visible: Boolean,
  description: String,
  onClose: () => void,
  onConfirm: (msg: string) => void,
  label: String,
  cancelLabel: string,
  confirmLabel: String,
};

const ModalInput = ({
  visible,
  onClose,
  onConfirm,
  label,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  description,
}: PropTypes) => {
  const [msg, setMsg] = useState('');
  return (
    <ModalContainer modalVisible={visible} onClose={onClose}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
        <InputForm
          label="Message"
          value={msg}
          onChangeText={msg => setMsg(msg)}
          multiline
          autoFocus
        />
        <View style={styles.action}>
          <TouchableOpacity style={styles.item} onPress={onClose}>
            <Text style={textStyle.bodyText}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => onConfirm(msg)}>
            <Text style={textStyle.bodyText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  label: {
    ...textStyleObject.widgetItem,
    marginBottom: 8,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  item: {
    padding: 4,
    marginEnd: 4,
  },
  description: {
    ...textStyleObject.bodyText,
  },
});

export default ModalInput;
