import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType } from 'types';
import RequestItem from './RequestItem';

type PropsType = {
  navigation: NavigationType,
};

const RequestListScreen = ({ navigation }: PropsType) => {
  const goToDetail = id => {
    alert('You click to id = ', id);
    // navigation.navigate('');
  };

  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const renderItem = item => (
    <RequestItem goToDetail={goToDetail} item={item} />
  );

  const renderKey = (index, item) => index.toString();

  return (
    <ViewContainer title="Request List">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={renderKey}
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({});

export default RequestListScreen;
