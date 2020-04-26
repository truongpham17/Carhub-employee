import { LeaseType } from 'types';
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
import { formatDate } from 'Utils/date';

const TRANSACTION_LEASE = ['ACCEPTED', 'WAIT_TO_RETURN', 'AVAILABLE'];

function getLeaseData(lease: LeaseType, type: string) {
  return {
    data: [
      {
        att: 'startDate',
        label: 'From date',
        detail: formatDate(lease.startDate),
      },
      {
        att: 'endDate',
        label: 'To date',
        detail: formatDate(lease.endDate),
      },
      {
        att: 'carId',
        label: 'Car model',
        detail: lease.car.carModel.name,
      },
      // { att: 'cost', label: 'Cost', detail: lease.totalCost },
      {
        att: 'pickupLocation',
        label: 'Hub location',
        detail: lease.hub.address,
      },
      { att: 'type', label: 'Type', detail: 'Lease request' },
    ],
    avatar: lease.customer.avatar,
    name: lease.customer.fullName,
    type,
  };
}

function listenFirebaseStatus({ lease, dispatch }) {
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

function handleProcessLeaseTransaction({ lease, navigation, dispatch }) {
  switch (lease.status) {
    case 'ACCEPTED':
      if (!lease.car.licensePlates) {
        setPopUpData(dispatch)({
          title: 'License plates',
          description: 'License plates',
          popupType: 'prompt',
          onConfirm(license) {
            console.log('transaction info: ', lease);
            setPopUpData(dispatch)({
              title: 'Confirm take car?',
              description: `Confirm take the ${lease.car.carModel.name} with license plates ${license} from ${lease.car.customer.fullName}`,
              onConfirm() {
                cancelPopup(dispatch);
                confirmTransaction(dispatch)(
                  {
                    id: lease._id,
                    type: 'lease',
                    licensePlates: license,
                  },
                  {
                    onSuccess() {
                      changeTransactionStatus(lease._id, COMPLETED);
                      navigation.navigate('RequestScreen');
                    },
                    onFailure() {
                      changeTransactionStatus(lease._id, CANCEL);
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
          description: `Confirm take ${lease.car.carModel.name} with license plates ${lease.car.licensePlates} from ${lease.car.customer.fullName}?`,
          onConfirm() {
            cancelPopup(dispatch);
            confirmTransaction(dispatch)(
              { id: lease._id, type: 'lease' },
              {
                onSuccess() {
                  changeTransactionStatus(lease._id, COMPLETED);
                  navigation.navigate('RequestScreen');
                },
                onFailure() {
                  changeTransactionStatus(lease._id, CANCEL);
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
        description: `Confirm return ${lease.car.carModel.name} with license plates ${lease.car.licensePlates} to ${lease.car.customer.fullName}?`,
        onConfirm() {
          cancelPopup(dispatch);
          changeTransactionStatus(lease._id, WAITING_FOR_USER_CONFIRM);
          listenFirebaseStatus({ dispatch, lease });
        },
      });
      break;
    default:
  }
}

export default function processLeaseRequest({
  transactionInfo,
  navigation,
  dispatch,
}) {
  changeTransactionStatus(transactionInfo._id, WAITING_FOR_CONFIRM);

  const selectedLease: LeaseType = { ...transactionInfo };
  let actionType = 'none';
  if (TRANSACTION_LEASE.includes(selectedLease.status)) {
    actionType = 'transaction';
  }
  navigation.navigate('RentDetailScreen', {
    ...getLeaseData(selectedLease, actionType),
    onConfirm() {
      handleProcessLeaseTransaction({
        lease: selectedLease,
        navigation,
        dispatch,
      });
    },
    onDecline() {
      changeTransactionStatus(selectedLease._id, CANCEL);
    },
  });
}
