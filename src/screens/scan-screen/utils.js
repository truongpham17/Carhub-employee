import { RentalType, LeaseType, UserType } from 'types';
import moment from 'moment';
import { changeTransactionStatus } from 'Utils/database';
import {
  WAITING_FOR_USER_CONFIRM,
  COMPLETED,
  CANCEL,
  WAITING_FOR_CONFIRM,
  USER_CANCEL,
} from 'Constants/status';
import { confirmTransaction } from '@redux/actions/qrCode';
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import firebase from 'react-native-firebase';

const TRANSACTION_LEASE = ['ACCEPTED', 'WAIT_TO_RETURN', 'AVAILABLE'];
const TRANSACTION_RENTAL = ['UPCOMING', 'CURRENT'];

export function getRentalData(rental: RentalType, type: String) {
  return {
    data: [
      { att: '_id', label: 'ID', value: rental._id },
      {
        att: 'startDate',
        label: 'From date',
        value: moment(rental.startDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'endDate',
        label: 'To date',
        value: moment(rental.endDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'carId',
        label: 'Car model',
        value: rental.carModel.name,
      },
      { att: 'cost', label: 'Cost', value: rental.totalCost },
      {
        att: 'pickupLocation',
        label: 'Pick up location',
        value: rental.pickupHub.address,
      },
      { att: 'type', label: 'Type', value: 'Hiring request' },
    ],
    avatar: rental.customer.avatar,
    name: rental.customer.fullName,
    type,
  };
}

export function getLeaseData(lease: LeaseType, type: string) {
  return {
    data: [
      { att: '_id', label: 'ID', value: lease._id },
      {
        att: 'startDate',
        label: 'From date',
        value: moment(lease.startDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'endDate',
        label: 'To date',
        value: moment(lease.endDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'carId',
        label: 'Car model',
        value: lease.car.carModel.name,
      },
      // { att: 'cost', label: 'Cost', value: lease.totalCost },
      {
        att: 'pickupLocation',
        label: 'Hub location',
        value: lease.hub.address,
      },
      { att: 'type', label: 'Type', value: 'Lease request' },
    ],
    avatar: lease.customer.avatar,
    name: lease.customer.fullName,
    type,
  };
}

export function listenFirebaseStatus({ lease, dispatch }) {
  firebase
    .database()
    .ref(`scanQRCode/${lease._id}`)
    .on('value', snapShot => {
      switch (snapShot.val().status) {
        case COMPLETED:
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Transaction success',
            description: 'Return car to user successfully',
          });
          break;
        case USER_CANCEL:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denined',
            description: 'User denied to get car, please try again',
          });
          break;
      }
    });
}

export function handleProcessTransaction({
  transactionInfo,
  type,
  status,
  navigation,
  dispatch,
}) {
  if (type === 'rental') {
    switch (status) {
      case 'UPCOMING':
        navigation.navigate('ScanCarScreen', {
          onSuccess(car) {
            navigation.navigate('RequestScreen');
            changeTransactionStatus(
              transactionInfo._id,
              WAITING_FOR_USER_CONFIRM,
              car
            );
          },
        });
        break;
      case 'CURRENT':
        break;
      default:
    }
  } else if (type === 'lease') {
    switch (status) {
      case 'ACCEPTED':
        if (!transactionInfo.car.licensePlates) {
          setPopUpData(dispatch)({
            title: 'License plates',
            description: 'License plates',
            popupType: 'prompt',
            onConfirm(license) {
              console.log('transaction info: ', transactionInfo);
              setPopUpData(dispatch)({
                title: 'Confirm take car?',
                description: `Confirm take the ${transactionInfo.car.carModel.name} with license plates ${license} from ${transactionInfo.car.customer.fullName}`,
                onConfirm() {
                  cancelPopup(dispatch);
                  confirmTransaction(dispatch)(
                    {
                      id: transactionInfo._id,
                      type: 'lease',
                      licensePlates: license,
                    },
                    {
                      onSuccess() {
                        changeTransactionStatus(transactionInfo._id, COMPLETED);
                        navigation.navigate('RequestScreen');
                      },
                      onFailure() {
                        changeTransactionStatus(transactionInfo._id, CANCEL);
                      },
                    }
                  );
                },
              });
            },
          });
        } else {
          setPopUpData(dispatch)({
            title: 'Confirm take car?',
            description: `Confirm take ${transactionInfo.car.carModel.name} with license plates ${transactionInfo.car.licensePlates} from ${transactionInfo.car.customer.fullName}?`,
            onConfirm() {
              cancelPopup(dispatch);
              confirmTransaction(dispatch)(
                { id: transactionInfo._id, type: 'lease' },
                {
                  onSuccess() {
                    changeTransactionStatus(transactionInfo._id, COMPLETED);
                    navigation.navigate('RequestScreen');
                  },
                  onFailure() {
                    changeTransactionStatus(transactionInfo._id, CANCEL);
                  },
                }
              );
            },
          });
        }

        break;
      case 'WAIT_TO_RETURN':
        setPopUpData(dispatch)({
          title: 'Confirm return car',
          description: `Confirm return ${transactionInfo.car.carModel.name} with license plates ${transactionInfo.car.licensePlates} to ${transactionInfo.car.customer.fullName}?`,
          onConfirm() {
            cancelPopup(dispatch);
            changeTransactionStatus(
              transactionInfo._id,
              WAITING_FOR_USER_CONFIRM
            );
            listenFirebaseStatus({ dispatch, lease: transactionInfo });
          },
        });
        break;
      default:
    }
  }
}

export function processLeaseRequest({ transactionInfo, navigation, dispatch }) {
  changeTransactionStatus(transactionInfo._id, WAITING_FOR_CONFIRM);

  const selectedLease: LeaseType = { ...transactionInfo };
  let actionType = 'none';
  if (TRANSACTION_LEASE.includes(selectedLease.status)) {
    actionType = 'transaction';
  }
  navigation.navigate('RentDetailScreen', {
    ...getLeaseData(selectedLease, actionType),
    onConfirm() {
      handleProcessTransaction({
        transactionInfo: selectedLease,
        type: 'lease',
        status: selectedLease.status,
        navigation,
        dispatch,
      });
    },
    onDecline() {
      changeTransactionStatus(selectedLease._id, CANCEL);
    },
  });
}

export function processRentalRequest({
  transactionInfo,
  navigation,
  dispatch,
}) {
  changeTransactionStatus(transactionInfo._id, WAITING_FOR_CONFIRM);

  let actionType = 'none';
  const selectedRental: RentalType = { ...transactionInfo };
  if (TRANSACTION_RENTAL.includes(selectedRental.status)) {
    actionType = 'transaction';
  }
  navigation.navigate('RentDetailScreen', {
    ...getRentalData(selectedRental, actionType),
    onConfirm: () =>
      handleProcessTransaction({
        transactionInfo: selectedRental,
        type: 'rental',
        status: selectedRental.status,
        navigation,
        dispatch,
      }),
    onDecline: () => {},
  });
}
