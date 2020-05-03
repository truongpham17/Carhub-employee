import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  setSelectedLease,
  declineLeaseRequest,
  acceptLeaseRequest,
  getLeaseList,
} from '@redux/actions/lease';
import { LeaseType, NavigationType } from 'types';

import { connect, useDispatch } from 'react-redux';

import moment from 'moment';
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import { formatDate } from 'Utils/date';
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
        { att: '_id', label: 'ID', value: selectedLease._id, hide: true },
        {
          att: 'customer',
          label: 'Customer',
          detail: selectedLease.customer.fullName,
          pressable: true,
          onItemPress() {
            setPopUpData(dispatch)({
              popupType: 'profile',
              description: selectedLease.customer,
            });
          },
          nextIcon: 'next',
        },
        {
          att: 'startDate',
          label: 'From date',
          detail: formatDate(selectedLease.startDate),
        },
        {
          att: 'endDate',
          label: 'To date',
          detail: formatDate(selectedLease.endDate),
        },
        {
          att: 'carId',
          label: 'Car model',
          detail: selectedLease.car.carModel.name,
        },
        {
          att: 'odometer',
          label: 'Car model',
          detail: selectedLease.car.odometer,
        },
        {
          att: 'using',
          label: 'Using years',
          detail: selectedLease.car.usingYear,
        },
        // { att: 'cost', label: 'Cost', detail: selectedLease.totalCost },
        // {
        //   att: 'pickupLocation',
        //   label: 'Hub location',
        //   detail: selectedLease.hub.address,
        // },
        { att: 'type', label: 'Type', detail: 'Lease request' },
      ],
      avatar: selectedLease.customer.avatar,
      name: selectedLease.customer.fullName,
      type:
        selectedLease.status === 'PENDING' ? 'accept-decline' : 'transaction',
      onConfirm() {
        if (selectedLease.status === 'PENDING') {
          showConfirmPopup(selectedLease._id);
        } else {
          navigation.navigate('ScanScreen', { id: selectedLease._id });
        }
      },
      onDecline() {
        showDeclinePopup(selectedLease._id, { id: selectedLease._id });
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
  console.log('lease list: ', leaseList);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={leaseList.filter(item => item.status !== 'DECLINED')}
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
