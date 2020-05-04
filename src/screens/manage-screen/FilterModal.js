import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ModalContainer } from 'Components';

type PropTypes = {
  visible: boolean,
};

const FilterModal = ({ visible }: PropTypes) => (
  <ModalContainer modalVisible={visible}></ModalContainer>
);

const styles = StyleSheet.create({});

export default FilterModal;
