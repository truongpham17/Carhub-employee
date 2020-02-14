import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RemoveIcon } from 'assets/svg';
import FilterItem from './FilterItem';

const SelectCarScreen = () => (
  <View>
    <FilterItem
      label="Exclusive car"
      onRemovePress={() => {
        console.log('hahaha');
      }}
    />
  </View>
);

export default SelectCarScreen;
