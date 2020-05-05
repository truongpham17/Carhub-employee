import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { setSelectedRental, getRentalList } from '@redux/actions/rental';
import { NavigationType, RentalType } from 'types';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { formatDate, formatPrice } from 'Utils/date';
import { setPopUpData } from '@redux/actions';
import RequestRentalItem from './RequestRentalItem';

type PropsType = {
  navigation: NavigationType,
  rentalList: [RentalType],
  setSelectedRental: string => void,
  getRentalList: () => void,
  search: string,
};

const ListRequestRentalScreen = ({
  navigation,
  rentalList,
  setSelectedRental,
  getRentalList,
  search = '',
}: PropsType) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    if (refreshing) {
      getRentalList({
        success() {
          setRefreshing(false);
        },
        failure() {
          setRefreshing(false);
        },
      });
    }
  }, [refreshing]);
  const onItemPress = _id => {
    setSelectedRental(_id);
    const selectedRental = rentalList.find(item => item._id === _id);
    navigation.navigate('RentDetailScreen', {
      data: [
        {
          att: 'customer',
          label: 'Customer',
          detail: selectedRental.customer.fullName,
          pressable: true,
          onItemPress() {
            setPopUpData(dispatch)({
              popupType: 'profile',
              description: selectedRental.customer,
            });
          },
          nextIcon: 'next',
        },

        { att: '_id', label: 'ID', detail: selectedRental._id, hide: true },
        {
          att: 'startDate',
          label: 'From date',
          detail: formatDate(selectedRental.startDate),
        },
        {
          att: 'endDate',
          label: 'To date',
          detail: formatDate(selectedRental.endDate),
        },
        {
          att: 'carId',
          label: 'Car model',
          detail: selectedRental.carModel.name,
        },
        {
          att: 'cost',
          label: 'Price',
          detail: formatPrice(selectedRental.totalCost),
        },
        { detail: 'Waiting for hire', att: 'status', label: 'Type' },
      ],
      avatar: selectedRental.customer.avatar,
      name: selectedRental.customer.fullName,
      type: 'decline-transaction',
      onConfirm: () => {
        navigation.navigate('ScanScreen', { id: selectedRental._id });
      },
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
      data={rentalList.filter(item => item.customer.fullName.includes(search))}
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
