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
import QuestionPopup from './QuestionPopup';
import RequestLeaseItem from './RequestLeaseItem';
import { getData, getActionType } from './utils';

type PropTypes = {
  leaseList: [LeaseType],
  setSelectedLease: string => void,
  navigation: NavigationType,
  search: string,
};

const ListRequestLeaseScreen = ({
  leaseList,
  navigation,
  search = '',
}: PropTypes) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [questionVisible, setQuestionVisible] = useState(false);

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
    setSelectedId(_id);
    const selectedLease = leaseList.find(item => item._id === _id);

    navigation.navigate('RentDetailScreen', {
      data: getData(selectedLease, dispatch),
      type: getActionType(selectedLease),
      onConfirm() {
        onConfirmTransaction(selectedLease);
      },
      onDecline() {
        onDeclineRequest(selectedLease);
      },
    });
  };

  const onConfirmTransaction = (selectedLease: LeaseType) => {
    switch (selectedLease.status) {
      case 'PENDING':
        return showConfirmPopup(selectedLease._id);
      case 'ACCEPTED':
        return navigation.navigate('ScanScreen', { id: selectedLease._id });
      case 'WAIT_TO_RETURN':
        return navigation.navigate('ScanScreen', { id: selectedLease._id });
    }
  };

  const onReturnCar = () => {};

  const onDeclineRequest = (selectedLease: LeaseType) => {
    if (selectedLease.status === 'PENDING') {
      return showDeclinePopup(selectedLease._id);
    }
    if (selectedLease.status === 'ACCEPTED') {
      return showRejectTransaction(selectedLease._id);
    }
  };

  const showRejectTransaction = () => {
    setPopUpData(dispatch)({
      title: 'Reject receive car',
      description: 'Are you sure to reject receive this car?',
      onConfirm() {
        cancelPopup(dispatch);
        setTimeout(() => {
          setQuestionVisible(true);
        }, 200);
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
        data={leaseList.filter(item => item.customer.fullName.includes(search))}
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
      <QuestionPopup
        modalVisible={questionVisible}
        onClose={() => setQuestionVisible(false)}
        onSubmit={message => {
          declineLeaseRequest(dispatch)({ id: selectedId, message });
          setQuestionVisible(false);
        }}
      />
    </View>
  );
};

export default connect(state => ({ leaseList: state.lease.leases }), {
  setSelectedLease,
})(ListRequestLeaseScreen);
const styles = StyleSheet.create({});
