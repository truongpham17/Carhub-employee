import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  setSelectedLease,
  declineLeaseRequest,
  acceptLeaseRequest,
  getLeaseList,
} from '@redux/actions/lease';
import { LeaseType, NavigationType } from 'types';
import { ModalInput } from 'Components';

import { connect, useDispatch } from 'react-redux';

import moment from 'moment';
import RequestLeaseItem from './RequestLeaseItem';

type PropTypes = {
  leaseList: [LeaseType],
  setSelectedLease: string => void,
  navigation: NavigationType,
};

const ListRequestLeaseScreen = ({
  leaseList,
  setSelectedLease,
  navigation,
}: PropTypes) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const onConfirmItem = id => {
    acceptLeaseRequest(dispatch)(id, {
      onSuccess() {
        navigation.navigate('RequestScreen');
      },
      onFailure() {
        console.log('ERROR');
      },
    });
  };

  const onShowConfirmDecline = id => {
    setSelectedId(id);
    setConfirmVisible(true);
  };

  const onDeclineItem = message => {
    setConfirmVisible(false);

    declineLeaseRequest(dispatch)(
      { id: selectedId, message },
      {
        onSuccess() {
          setSelectedId(null);

          navigation.navigate('RequestScreen');
        },
        onFailure() {
          setSelectedId(null);

          console.log('ERROR');
        },
      }
    );
  };
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
      onConfirm: () => onConfirmItem(selectedLease._id),
      onDecline: () => onShowConfirmDecline(selectedLease._id),
    });
  };

  const onRefresh = () => {
    getLeaseList(dispatch)({
      onSuccess() {
        setRefresh(false);
      },
      onFailure() {
        setRefresh(false);
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={leaseList.filter(item => item.status === 'PENDING')}
        renderItem={({ item }) => (
          <RequestLeaseItem
            data={item}
            onItemPress={onItemPress}
            navigation={navigation}
            onAccept={() => onConfirmItem(item._id)}
            onDecline={() => onShowConfirmDecline(item._id)}
          />
        )}
        keyExtractor={(item, index) => item._id}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refresh}
      />

      <ModalInput
        visible={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        onConfirm={msg => onDeclineItem(msg)}
        label="Are you sure to decline this request"
        description="Please write down some reasons why you decline this request to customer"
        confirmLabel="Confirm"
      />
    </View>
  );
};

export default connect(state => ({ leaseList: state.lease.leases }), {
  setSelectedLease,
})(ListRequestLeaseScreen);
const styles = StyleSheet.create({});
