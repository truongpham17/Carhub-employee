import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ViewContainer, ListItem } from 'Components';
import { getHubCarList, setSelectedCarModel } from '@redux/actions/statistic';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationType, CarModelReport } from 'types';
import ManageItem from './ManageItem';

type PropTypes = {
  navigation: NavigationType,
};

const ManageScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const carModels: [CarModelReport] = useSelector(
    state => state.statistic.carModels
  );
  const loading = useSelector(state => state.statistic.loading);
  useEffect(() => {
    getHubCarList(dispatch)();
  }, []);
  const onBackPress = () => {
    navigation.pop();
  };

  const onItemPress = id => {
    setSelectedCarModel(dispatch)(id);
    navigation.navigate('CarModelDetail');
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Manage screen"
      onBackPress={onBackPress}
      loading={loading}
    >
      <FlatList
        data={carModels}
        renderItem={({ item }) => (
          <ManageItem
            type="detail"
            name={item.carModel.name}
            quantity={item.currentQuantity}
            onItemPress={() => onItemPress(item.carModel._id)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ViewContainer>
  );
};

export default ManageScreen;
const styles = StyleSheet.create({});
