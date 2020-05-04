import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import Separator from 'Components/Separator';

type CarItemTypes = {
  number: String,
  onItemPress: () => void,
  type: 'Hub car' | 'Customer car',
};

const CarItem = ({ number, onItemPress, type }: CarItemTypes) => (
  <TouchableOpacity
    style={{
      borderRadius: scaleHor(24),
      justifyContent: 'center',
      paddingStart: 16,
    }}
    onPress={onItemPress}
  >
    <Text style={textStyle.bodyText}>
      <Text style={textStyle.bodyTextBold}>License plates: </Text>
      {number}
    </Text>

    <Text style={textStyle.bodyText}>
      <Text style={textStyle.bodyTextBold}>Car type: </Text>
      {type}
    </Text>

    <Separator />
  </TouchableOpacity>
);

export default CarItem;
