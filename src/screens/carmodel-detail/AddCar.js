import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { InputForm, Button } from 'Components';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';

type PropTypes = {
  onAddCar: () => void,
};

const AddCar = ({ onAddCar }: PropTypes) => {
  const [data, setData] = useState({});
  const onChangeText = (text, type) => {
    setData(data => ({ ...data, [type]: text }));
  };

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
        Create new car
      </Text>
      <InputForm
        label="License plates"
        value={data.license}
        onChangeText={text => onChangeText(text, 'license')}
      />
      <InputForm
        label="Using year"
        keyboardType="numeric"
        value={data.year}
        onChangeText={text => onChangeText(text, 'year')}
      />
      <InputForm
        label="Odometer"
        containerStyle={{ marginBottom: scaleVer(16) }}
        keyboardType="numeric"
        value={data.odometer}
        onChangeText={text => onChangeText(text, 'odometer')}
      />
      <Button label="Add car" onPress={() => onAddCar(data)} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddCar;
