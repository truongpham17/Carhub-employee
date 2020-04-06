import React, { useState, useEffect } from 'react';
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
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import RequestLeaseItem from './RequestLeaseItem';

type PropTypes = {
  leaseList: [LeaseType],
  setSelectedLease: string => void,
  navigation: NavigationType,
};

const ListRequestLeaseScreen = ({ leaseList, navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getLeaseList(dispatch)();
  }, []);

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

  const onDeclineItem = (id, message) => {
    declineLeaseRequest(dispatch)(
      { id, message },
      {
        onSuccess() {
          navigation.navigate('RequestScreen');
        },
        onFailure() {
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
      onConfirm() {
        showConfirmPopup(selectedLease._id);
      },
      onDecline() {
        showDeclinePopup(selectedLease._id);
      },
    });
  };

  const showDeclinePopup = id => {
    setPopUpData(dispatch)({
      title: 'Decline request',
      description: 'Are you sure to decline this request?',
      onConfirm() {
        console.log('hello this is great');
        setPopUpData(dispatch)({
          title: 'Input reason to decline',
          description: 'Reason',
          popupType: 'prompt',
          onConfirm(msg) {
            onDeclineItem(id, msg);
            cancelPopup(dispatch);
          },
        });
      },
    });
  };

  const showConfirmPopup = id => {
    const lease = leaseList.find(lease => lease._id === id);

    setPopUpData(dispatch)({
      title: 'Confirm request',
      description: `Are you sure to confirm to this lease request with the ${lease.car.carModel.name}`,
      onConfirm() {
        onConfirmItem(id);
        cancelPopup(dispatch);
      },
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
            onAccept={() => showConfirmPopup(item._id)}
            onDecline={() => showDeclinePopup(item._id)}
          />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refresh}
      />
    </View>
  );
};

export default connect(state => ({ leaseList: state.lease.leases }), {
  setSelectedLease,
})(ListRequestLeaseScreen);
const styles = StyleSheet.create({});
