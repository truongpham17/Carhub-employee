import { RentalType, CarType } from 'types';
import { changeTransactionStatus } from 'Utils/database';
import {
  WAITING_FOR_USER_CONFIRM,
  COMPLETED,
  WAITING_FOR_CONFIRM,
  USER_CANCEL,
  TRANSACTION_ERROR,
  CANCEL,
} from 'Constants/status';
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import firebase from 'react-native-firebase';
import { formatDate } from 'Utils/date';
import { confirmTransaction } from '@redux/actions';

const TRANSACTION_RENTAL = ['UPCOMING', 'CURRENT'];
function getRentalLabel(rental: RentalType) {
  switch (rental.status) {
    case 'UPCOMING':
      return 'Get car';
    case 'CURRENT':
    case 'OVERDUE':
      return 'Return car';
  }
}
function getRentalData(rental: RentalType, type: String) {
  return {
    data: [
      {
        att: 'user',
        label: 'Customer',
        detail: rental.customer.fullName,
        pressable: true,
      },
      {
        att: 'startDate',
        label: 'From date',
        detail: formatDate(rental.startDate),
      },
      {
        att: 'endDate',
        label: 'To date',
        detail: formatDate(rental.endDate),
      },
      {
        att: 'carId',
        label: 'Car model',
        detail: rental.carModel.name,
      },
      { att: 'cost', label: 'Cost', detail: rental.totalCost },
      {
        att: 'pickupLocation',
        label: 'Pick up location',
        detail: rental.pickupHub.address,
      },
      { att: 'type', label: 'Type', detail: getRentalLabel(rental) },
    ],
    avatar: rental.customer.avatar,
    name: rental.customer.fullName,
    type,
  };
}

function listenFirebaseStatus({ rental, dispatch, navigation }) {
  firebase
    .database()
    .ref(`scanQRCode/${rental._id}`)
    .on('value', snapShot => {
      switch (snapShot.val().status) {
        case COMPLETED:
          navigation.pop(2);
          setPopUpData(dispatch)({
            popupType: 'success',
            title: 'Transaction success',
            description: 'Transfer car to user successfully',
          });
          break;
        case USER_CANCEL:
          navigation.pop(2);
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction denined',
            description: 'User denied to get car, please try again',
          });
          break;
        case TRANSACTION_ERROR:
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Transaction error',
            description:
              'There was an error process this transaction. Please try again!',
          });
      }
    });
}

function handleProcessRentalTransaction({ rental, navigation, dispatch }) {
  switch (rental.status) {
    case 'UPCOMING':
      navigation.navigate('ScanCarScreen', {
        callback() {
          listenFirebaseStatus({ rental, dispatch, navigation });
        },
      });
      break;
    case 'CURRENT':
    case 'OVERDUE':
      setPopUpData(dispatch)({
        title: 'Confirm get car',
        description: `Confirm get the ${rental.car.carModel.name} with license plates ${rental.car.licensePlates}?`,
        onConfirm() {
          cancelPopup(dispatch);
          confirmTransaction(dispatch)(
            { id: rental._id, toStatus: 'PAST', type: 'rental' },
            {
              onSuccess() {
                changeTransactionStatus(rental._id, COMPLETED);
                setPopUpData(dispatch)({
                  popupType: 'success',
                  acceptOnly: true,
                  title: 'Success',
                  description: 'Take car successfully',
                  onConfirm() {
                    cancelPopup(dispatch);
                    navigation.pop(2);
                  },
                });
              },
              onFailure() {
                changeTransactionStatus(rental._id, TRANSACTION_ERROR);
              },
            }
          );
        },
        onDecline() {
          cancelPopup(dispatch);
          changeTransactionStatus(rental._id, CANCEL);
        },
      });
      break;
    default:
  }
}

export default function processRentalRequest({
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
    onConfirm() {
      handleProcessRentalTransaction({
        rental: selectedRental,
        navigation,
        dispatch,
      });
    },
    onDecline() {},
  });
}
