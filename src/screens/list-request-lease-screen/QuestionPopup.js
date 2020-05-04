import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ModalContainer, Button } from 'Components';
import { CheckBox } from 'react-native-elements';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { LEASE_REJECT_REASONS } from 'Constants/app';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
  onSubmit: () => void,
};

const CancelPopup = ({ modalVisible, onClose, onSubmit }: PropTypes) => {
  const [checks, setChecks] = useState([]);

  const onSubmitPress = () => {
    let reasons = '';
    checks
      .sort((a, b) => a - b)
      .forEach(idx => {
        reasons += `${LEASE_REJECT_REASONS[idx]}/`;
      });
    if (reasons.endsWith('/')) {
      reasons = reasons.slice(0, reasons.length - 1);
    }
    onSubmit(reasons);
  };
  return (
    <ModalContainer modalVisible={modalVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Reason</Text>
        <Text
          style={[
            textStyle.bodyText,
            { marginVertical: scaleVer(8), textAlign: 'center' },
          ]}
        >
          Please select why this request is denined
        </Text>
        {LEASE_REJECT_REASONS.map((item, idx) => (
          <CheckBox
            title={item}
            checked={checks.includes(idx)}
            onPress={() =>
              setChecks(
                checks.includes(idx)
                  ? checks.filter(item => item !== idx)
                  : [...checks, idx]
              )
            }
          />
        ))}

        <Button
          label="Submit"
          onPress={onSubmitPress}
          style={{ marginTop: scaleVer(16) }}
          colorStart={colors.errorLight}
          colorEnd={colors.error}
        />
        <Button
          label="Cancel"
          onPress={onClose}
          style={{ marginTop: scaleVer(8) }}
        />
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: scaleHor(16),
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  title: {
    ...textStyleObject.widgetItem,
    textAlign: 'center',
  },
});

export default CancelPopup;
