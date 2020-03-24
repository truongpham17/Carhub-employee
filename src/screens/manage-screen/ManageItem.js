import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import Separator from 'Components/Separator';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PropTypes = {
  name: string,
  quantity: Number,
  onItemPress: () => void,
};

const ManageItem = ({ name, quantity, onItemPress }: PropTypes) => (
  <TouchableOpacity onPress={onItemPress}>
    <Text style={textStyle.bodyText}>
      <Text style={textStyle.bodyTextBold}>Model: </Text>
      {name}
    </Text>
    <Text style={textStyle.bodyText}>
      <Text style={textStyle.bodyTextBold}>Current available: </Text>
      {quantity}
    </Text>
    <Separator />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});

export default ManageItem;
