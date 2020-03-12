import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  setQRCodeInfo,
  getTransationInfo,
  confirmTransaction,
} from '@redux/actions/qrCode';
import BarcodeMask from 'react-native-barcode-mask';
import { ViewContainer } from 'Components';
import { RentalType, NavigationType, LeaseType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from 'react-native-firebase';

type PropTypes = {
  setQRCodeInfo: () => void,
  transactionData: {},
  navigation: NavigationType,
  confirmTransaction: () => void,
};
const ScanQrCodeScreen = ({
  setQRCodeInfo,
  transactionData,
  navigation,
  confirmTransaction,
}: PropTypes) => {
  const [barcode, setBarcode] = useState(null);

  const loadInfo = async data => {
    const transactionInfo = await getTransationInfo(data);
    firebase
      .database()
      .ref(`scanQRCode/${transactionInfo._id}`)
      .set({
        _id: transactionInfo._id,
        status: 'completed',
      });
    setQRCodeInfo(transactionInfo);
    if (transactionInfo.transactionType === 'rental') {
      let type = '';
      const selectedRental: RentalType = { ...transactionInfo };
      if (
        selectedRental.status === 'UPCOMING' ||
        selectedRental.status === 'CURRENT'
      ) {
        type = 'transaction';
      } else {
        type = 'none';
      }

      navigation.navigate('RentDetailScreen', {
        data: [
          { att: '_id', label: 'ID', value: selectedRental._id },
          {
            att: 'startDate',
            label: 'From date',
            value: moment(selectedRental.startDate).format('DD/MMM/YYYY'),
          },
          {
            att: 'endDate',
            label: 'To date',
            value: moment(selectedRental.endDate).format('DD/MMM/YYYY'),
          },
          {
            att: 'carId',
            label: 'Car model',
            value: selectedRental.carModel.name,
          },
          { att: 'cost', label: 'Cost', value: selectedRental.totalCost },
          {
            att: 'pickupLocation',
            label: 'Pick up location',
            value: selectedRental.pickupHub.address,
          },
          { att: 'type', label: 'Type', value: 'Hiring request' },
        ],
        avatar: selectedRental.customer.avatar,
        name: selectedRental.customer.fullName,
        type,
        onConfirm: () => {
          if (transactionInfo.transactionType === 'rental') {
            confirmTransaction(
              { id: selectedRental._id, type: 'rental' },
              {
                onSuccess() {
                  navigation.pop();
                  setTimeout(() => {
                    Alert.alert('Success!', 'Complete transaction');
                  }, 500);
                },
              }
            );
          }
        },
        onDecline: () => {},
      });
    } else {
      const selectedLease: LeaseType = { ...transactionInfo };
      let type = 'none';
      if (
        selectedLease.status === 'UPCOMING' ||
        selectedLease.status === 'WAIT_TO_RETURN' ||
        selectedLease.status === 'AVAILABLE'
      ) {
        type = 'transaction';
      }
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
        type,
        onConfirm: () => {},
        onDecline: () => {},
      });
    }

    setBarcode(null);
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      setQRCodeInfo(JSON.parse(`${barcodes.data}`));

      loadInfo({ ...JSON.parse(`${barcodes.data}`), type: 'rental' });
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
