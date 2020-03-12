import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import { setSelectedLease } from '@redux/actions/lease';
import { LeaseType, NavigationType } from 'types';

import { connect } from 'react-redux';

import moment from 'moment';
import LeaseItem from './LeaseItem';

type PropTypes = {
  leaseList: [LeaseType],
  setSelectedLease: string => void,
  navigation: NavigationType,
};

const LeaseListScreen = ({
  leaseList,
  setSelectedLease,
  navigation,
}: PropTypes) => {
  const onItemPress = _id => {
    const selectedLease = leaseList.find(item => item._id === _id);

    navigation.navigate('RentDetailScreen', {
      data: [
        { att: '_id', label: 'ID', value: selectedLease._id },
        {
          att: 'startDate',
          label: 'From date',
          value: moment(selectedLease.startDate).format('DD/MMM/YYYY'),
        },
        {
          att: 'endDate',
          label: 'To date',
          value: moment(selectedLease.endDate).format('DD/MMM/YYYY'),
        },
        {
          att: 'carId',
          label: 'Car model',
          value: selectedLease.car.carModel.name,
        },
        // { att: 'cost', label: 'Cost', value: selectedLease.totalCost },
        {
          att: 'pickupLocation',
          label: 'Hub location',
          value: selectedLease.hub.address,
        },
        { att: 'type', label: 'Type', value: 'Lease request' },
      ],
      avatar: selectedLease.customer.avatar,
      name: selectedLease.customer.fullName,
      type: 'accept-decline',
      onConfirm: () => {},
      onDecline: () => {},
    });
  };
  return (
    <FlatList
      data={leaseList}
      renderItem={({ item, index }) => (
        <LeaseItem data={item} onItemPress={onItemPress} />
      )}
      keyExtractor={(item, index) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default connect(state => ({ leaseList: state.lease.leases }), {
  setSelectedLease,
})(LeaseListScreen);
const styles = StyleSheet.create({});
