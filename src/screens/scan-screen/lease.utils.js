import { LeaseType } from 'types';
import moment from 'moment';
import { changeTransactionStatus } from 'Utils/database';
import {
  WAITING_FOR_USER_CONFIRM,
  COMPLETED,
  CANCEL,
  WAITING_FOR_CONFIRM,
  USER_ACCEPT_TRANSFER_CAR,
  USER_CANCEL,
  WAITING_USER_TRANSFER_CAR,
  HUB_REJECT_TRASACTION_LEASE,
} from 'Constants/status';
import { confirmTransaction } from '@redux/actions/qrCode';
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import firebase from 'react-native-firebase';
import { formatDate } from 'Utils/date';
import { getLeaseList, declineLeaseRequest } from '@redux/actions';
import { LEASE_REJECT_REASONS } from 'Constants/app';
import { getData } from '../list-request-lease-screen/utils';

const TRANSACTION_LEASE = ['WAIT_TO_RETURN', 'AVAILABLE'];

function listenFirebaseStatus({ lease, dispatch, navigation }) {
  firebase
    .database()
    .ref(`scanQRCode/${lease._id}`)
    .on('value', snapShot => {
      switch (snapShot.val().status) {
        case COMPLETED:
          navigation.pop(2);
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Transaction success',
            description: 'Return car to user successfully',
          });
          navigation.navigate('ListRequestLeaseScreen');
          getLeaseList(dispatch)();
          break;
        case USER_CANCEL:
          navigation.pop(2);
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denined',
            description: 'User denied to get car, please try again',
          });
          break;
      }
    });
}

function listenGetCarStatus({ lease, dispatch, navigation }) {
  firebase
    .database()
    .ref(`scanQRCode/${lease._id}`)
    .on('value', snapShot => {
      switch (snapShot.val().status) {
        case USER_ACCEPT_TRANSFER_CAR:
          cancelPopup(dispatch);
          confirmTransaction(dispatch)(
            { id: lease._id, type: 'lease' },
            {
              onSuccess() {
                changeTransactionStatus(lease._id, COMPLETED);
                setPopUpData(dispatch)({
                  popupType: 'success',
                  title: 'Success',
                  description: 'Successfully take car from customer',
                  onConfirm() {
                    changeTransactionStatus(lease._id, COMPLETED);
                    getLeaseList(dispatch)();
                    cancelPopup(dispatch);
                    navigation.navigate('RequestScreen');
                  },
                });
                // navigation.navigate('RequestScreen');
              },
              onFailure() {
                changeTransactionStatus(lease._id, CANCEL);
              },
            }
          );
          break;
        case USER_CANCEL:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denined',
            description: 'User denied placing car. Please try again!',
          });
          break;
      }
    });
}

function handleProcessLeaseTransaction({ lease, navigation, dispatch }) {
  switch (lease.status) {
    case 'ACCEPTED':
      setPopUpData(dispatch)({
        title: 'Confirm take car?',
        description: `Confirm take ${lease.car.carModel.name} with license plates ${lease.car.licensePlates} from ${lease.car.customer.fullName}?`,
        onConfirm() {
          setPopUpData(dispatch)({
            title: 'Waiting for user confirm',
            acceptOnly: true,
          });
          changeTransactionStatus(lease._id, WAITING_USER_TRANSFER_CAR);
          listenGetCarStatus({ lease, dispatch, navigation });
        },
      });

      break;
    case 'WAIT_TO_RETURN':
      setPopUpData(dispatch)({
        title: 'Confirm return car',
        description: `Confirm return ${lease.car.carModel.name} with license plates ${lease.car.licensePlates} to ${lease.car.customer.fullName}?`,
        onConfirm() {
          cancelPopup(dispatch);
          changeTransactionStatus(lease._id, WAITING_FOR_USER_CONFIRM);
          listenFirebaseStatus({ dispatch, lease, navigation });
        },
      });
      break;
    default:
  }
}

export default function processLeaseRequest({
  transactionInfo: selectedLease,
  navigation,
  dispatch,
}) {
  changeTransactionStatus(selectedLease._id, WAITING_FOR_CONFIRM);
  // const selectedLease: LeaseType = { ...transactionInfo };
  let actionType = 'none';
  if (TRANSACTION_LEASE.includes(selectedLease.status)) {
    actionType = 'transaction-accept';
  }
  if (selectedLease.status === 'ACCEPTED') {
    actionType = 'transaction';
  }

  navigation.navigate('RentDetailScreen', {
    data: getData(selectedLease, dispatch),
    requestType: 'lease',
    detail: selectedLease,
    onConfirm() {
      handleProcessLeaseTransaction({
        lease: selectedLease,
        navigation,
        dispatch,
      });
    },
    onDecline() {
      showRejectTransaction(dispatch, selectedLease, navigation);
    },
    type: actionType,
  });

  // handleProcessLeaseTransaction({ lease: selectedLease, navigation, dispatch });
}

const showRejectTransaction = (
  dispatch,
  selectedLease: LeaseType,
  navigation
) => {
  setPopUpData(dispatch)({
    title: 'Reject receive car',
    description: 'Are you sure to reject receive this car?',
    onConfirm() {
      setPopUpData(dispatch)({
        popupType: 'prompt',
        title: 'Reject receive car',
        description: 'Please input reason why reject receive this car',
        onConfirm(message) {
          cancelPopup(dispatch);
          changeTransactionStatus(
            selectedLease._id,
            HUB_REJECT_TRASACTION_LEASE
          );
          declineLeaseRequest(dispatch)(
            { id: selectedLease._id, message },
            {
              onSuccess() {
                getLeaseList(dispatch)();
                navigation.navigate('RequestScreen');
              },
              onFailure() {
                console.log('ERROR');
              },
            }
          );
        },
      });
      // setPopUpData(dispatch)( {
      //   popupType: 'survey',
      //   title: 'Reason to reject',
      //   description: LEASE_REJECT_REASONS,
      //   onConfirm(msg) {

      //   }
      // });
    },
  });
};
