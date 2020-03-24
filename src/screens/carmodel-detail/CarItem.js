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
      License plates: <Text style={textStyle.bodyTextBold}>{number}</Text>
    </Text>
    <Text style={textStyle.label}>{type}</Text>
    <Separator />
  </TouchableOpacity>
);

export default CarItem;
