import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'Components';
import { CheckBox } from 'react-native-elements';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  description: [],
  title: string,
};
/*
 title: String,
  description: String,
  onDecline: () => void,
  onConfirm: () => void,
  onClose: () => void,
  modalVisible: Boolean,
  popupType: 'success' | 'confirm' | 'error' | 'prompt' | 'profile' | 'survey',
  grandResponder: Boolean,
  acceptOnly: Boolean,
*/

const SurveyPopup = ({ onClose, onConfirm, description, title }: PropTypes) => {
  const [checks, setChecks] = useState([]);

  const onSubmitPress = () => {
    let reasons = '';
    checks
      .sort((a, b) => a - b)
      .forEach(idx => {
        reasons += `${description[idx]}/`;
      });
    if (reasons.endsWith('/')) {
      reasons = reasons.slice(0, reasons.length - 1);
    }
    onConfirm(reasons);
  };
  return (
    <>
      <Text style={styles.title}>Reason</Text>
      <Text
        style={[
          textStyle.bodyText,
          { marginVertical: scaleVer(8), textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      {description.map((item, idx) => (
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
    </>
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

export default SurveyPopup;
