import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';

import { connect } from 'react-redux';

import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const EditCarScreen = ({ navigation }: PropTypes) => {
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Search Car"
      onBackPress={onBackPress}
    ></ViewContainer>
  );
};

export default EditCarScreen;
const styles = StyleSheet.create({});
