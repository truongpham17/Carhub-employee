import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { setSelectedRental, getRentalList } from '@redux/actions/rental';
import { NavigationType, RentalType } from 'types';
import { connect } from 'react-redux';
import moment from 'moment';
import RequestRentalItem from './RequestRentalItem';

type PropsType = {
  navigation: NavigationType,
  rentalList: [RentalType],
  setSelectedRental: string => void,
  getRentalList: () => void,
};

const ListRequestRentalScreen = ({
  navigation,
  rentalList,
  setSelectedRental,
  getRentalList,
}: PropsType) => {
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    navigation.addListener('didFocus', () => setRefreshing(true));
    if (refreshing) {
      getRentalList();
      setRefreshing(false);
    }
  }, [refreshing]);
  const onItemPress = _id => {
    setSelectedRental(_id);
    const selectedRental = rentalList.find(item => item._id === _id);
    navigation.navigate('RentDetailScreen', {
      data: [
        { att: '_id', label: 'ID', value: selectedRental._id },
        {
          att: 'startDate',
          label: 'From date',
          value: moment(selectedRental.startDate).format('DD/MMM/YYYY'),
        },
        {
          att: 'endDate',
          label: 'To date',
          value: moment(selectedRental.endDate).format('DD/MMM/YYYY'),
        },
        {
          att: 'carId',
          label: 'Car model',
          value: selectedRental.carModel.name,
        },
        { att: 'cost', label: 'Cost', value: selectedRental.totalCost },
        {
          att: 'pickupLocation',
          label: 'Pick up location',
          value: selectedRental.pickupHub.address,
        },
        { value: 'Waiting for hire' },
      ],
      avatar: selectedRental.customer.avatar,
      name: selectedRental.customer.fullName,
      type: 'decline',
      onConfirm: () => {},
      onDecline: () => {},
    });
    setRefreshing(true);
  };

  const renderItem = ({ item, index }) => (
    <RequestRentalItem data={item} onItemPress={onItemPress} />
  );

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      data={rentalList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});

export default connect(
  state => ({
    rentalList: state.rental.rentals,
  }),
  { setSelectedRental, getRentalList }
)(ListRequestRentalScreen);
