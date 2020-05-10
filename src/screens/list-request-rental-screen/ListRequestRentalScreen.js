import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  setSelectedRental,
  getRentalList,
  updateRentalStatus,
} from '@redux/actions/rental';
import { NavigationType, RentalType } from 'types';
import { connect, useDispatch } from 'react-redux';
import { setPopUpData, cancelPopup } from '@redux/actions';
import RequestRentalItem from './RequestRentalItem';
import { getData, getActionType } from './utils';

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
      data: getData(selectedRental, dispatch),
      type: getActionType(selectedRental, true),
      onConfirm: () => {
        navigation.navigate('ScanScreen', { id: selectedRental._id });
      },
      onDecline: () => {
        setPopUpData(dispatch)({
          title: 'Decline request',
          description: 'Are you sure to decline this booking request?',
          onConfirm() {
            cancelPopup(dispatch);
            updateRentalStatus(dispatch)(
              {
                id: selectedRental._id,
                status: 'DECLINED',
              },
              {
                onSuccess() {
                  navigation.pop();
                  getRentalList(dispatch)();
                },
              }
            );
          },
        });
      },
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
