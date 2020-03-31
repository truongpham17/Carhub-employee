import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  setQRCodeInfo,
  getTransationInfo,
  confirmTransaction,
} from '@redux/actions/qrCode';
import BarcodeMask from 'react-native-barcode-mask';
import { ViewContainer, ConfirmPopup } from 'Components';
import { RentalType, NavigationType, LeaseType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import {
  WAITING_FOR_CONFIRM,
  WAITING_FOR_USER_CONFIRM,
  COMPLETED,
  CANCEL,
} from 'Constants/status';
import { changeTransactionStatus } from 'Utils/database';
import { getRentalData, getLeaseData } from './utils';

type PropTypes = {
  setQRCodeInfo: () => void,
  transactionData: {},
  navigation: NavigationType,
  confirmTransaction: () => void,
};
const ScanQrCodeScreen = ({
  setQRCodeInfo,
  navigation,
  confirmTransaction,
}: PropTypes) => {
  const [barcode, setBarcode] = useState(null);
  const userID = useSelector(state => state.user._id);
  const info = useSelector(state => state.qrCode.info) || {
    carModel: {},
    car: {},
  };
  const [returnVisible, setReturnVisible] = useState(false);

  const onConfirmReceiveCar = () => {
    setReturnVisible(false);
    confirmTransaction(
      {
        id: info._id,
        type: info.transactionType,
        toStatus: 'PAST',
      },
      {
        onSuccess() {
          changeTransactionStatus(info._id, COMPLETED, userID);
          navigation.navigate('RequestScreen');
        },
        onFailure() {
          Alert.alert('Something went wrong, please try again!');
          changeTransactionStatus(info._id, CANCEL, userID);
        },
      }
    );
  };

  const onConfirmTransaction = (transactionInfo, type, status) => {
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
          setReturnVisible(true);

          break;
        default:
      }
    } else if (type === 'lease') {
      switch (status) {
        case 'ACCEPTED':
          confirmTransaction(
            { id: transactionInfo._id, type: 'lease', employeeID: userID },
            {
              onSuccess() {
                changeTransactionStatus(transactionInfo._id, COMPLETED, userID);
              },
              onFailure() {
                changeTransactionStatus(transactionInfo._id, CANCEL, userID);
              },
            }
          );
          break;
        case 'WAIT_TO_RETURN':
          changeTransactionStatus(
            transactionInfo._id,
            WAITING_FOR_USER_CONFIRM,
            userID
          );
          break;
        default:
      }
    }
  };

  const TRANSACTION_RENTAL = ['UPCOMING', 'CURRENT'];
  const TRANSACTION_LEASE = ['ACCEPTED', 'WAIT_TO_RETURN', 'AVAILABLE'];

  const loadInfo = async data => {
    const transactionInfo = await getTransationInfo(data);
    console.log(transactionInfo);

    changeTransactionStatus(transactionInfo._id, WAITING_FOR_CONFIRM);

    setQRCodeInfo(transactionInfo);

    const type = transactionInfo.transactionType;

    if (transactionInfo.transactionType === 'rental') {
      let actionType = 'none';
      const selectedRental: RentalType = { ...transactionInfo };
      if (TRANSACTION_RENTAL.includes(selectedRental.status)) {
        actionType = 'transaction';
      }
      navigation.navigate('RentDetailScreen', {
        ...getRentalData(selectedRental, actionType),
        onConfirm: () =>
          onConfirmTransaction(selectedRental, type, selectedRental.status),
        onDecline: () => {},
      });
    } else {
      const selectedLease: LeaseType = { ...transactionInfo };
      let actionType = 'none';
      if (TRANSACTION_LEASE.includes(selectedLease.status)) {
        actionType = 'transaction';
      }
      navigation.navigate('RentDetailScreen', {
        ...getLeaseData(selectedLease, actionType),
        onConfirm: () =>
          onConfirmTransaction(selectedLease, type, selectedLease.status),
        onDecline: () => {
          changeTransactionStatus(selectedLease._id, CANCEL);
        },
      });
    }

    setBarcode(null);
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      const data = JSON.parse(`${barcodes.data}`);
      console.log('Data QR', data.expired);
      if (data.expired <= Date.now()) {
        alert('QR Code is expired!');
        setBarcode(null);
        return;
      }
      // setQRCodeInfo(JSON.parse(`${barcodes.data}`));
      loadInfo({ ...data });
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={barcodeRecognize}
      >
        <BarcodeMask />
      </RNCamera>

      <ConfirmPopup
        title="Confirm receive car"
        description={`Are you sure to confirm receiving ${
          info.carModel.name
        }? with license plates ${info.car ? info.car.licensePlates : ''}?`}
        modalVisible={returnVisible}
        onClose={() => setReturnVisible(false)}
        onConfirm={() => onConfirmReceiveCar()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default connect(
  state => ({
    transactionData: state.qrCode.transactionInfo,
  }),
  { setQRCodeInfo, confirmTransaction }
)(ScanQrCodeScreen);
