import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { InputForm, Button } from 'Components';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';

type PropTypes = {
  dataProps: { usingYear: number, odometer: Number },
  onSave: () => void,
};

const EditCar = ({
  dataProps = { usingYear: '', odometer: '' },
  onSave,
}: PropTypes) => {
  const [data, setData] = useState(dataProps);

  useEffect(() => {
    setData(dataProps);
  }, [dataProps]);

  return (
    <View
      style={{
        width: '90%',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Text
        style={[
          textStyle.widgetItem,
          { textAlign: 'center', marginBottom: scaleVer(8) },
        ]}
      >
        Edit car
      </Text>
      <InputForm
        label="Using year"
        value={data.usingYear.toString()}
        keyboardType="numeric"
        onChangeText={text => setData(data => ({ ...data, usingYear: text }))}
      />
      <InputForm
        label="Odometer"
        value={data.odometer.toString()}
        keyboardType="numeric"
        onChangeText={text => setData(data => ({ ...data, odometer: text }))}
        containerStyle={{ marginBottom: scaleVer(16) }}
      />
      <Button label="Save" onPress={() => onSave(data)} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditCar;
