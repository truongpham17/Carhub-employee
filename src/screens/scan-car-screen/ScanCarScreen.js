import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';

import BarcodeMask from 'react-native-barcode-mask';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType } from 'types';
import { ViewContainer } from 'Components';
import {
  getCar,
  checkAvailableCar,
  setPopUpData,
  cancelPopup,
} from '@redux/actions';
import {
  RENTAL_CAR_ALREADY_IN_USE,
  RENTAL_NOT_FOUND_CAR,
  RENTAL_CAR_NOT_MATCH_ADDRESS,
  RENTAL_NOT_MATCH_CAR_MODEL,
} from 'Constants/errorCode';
import { changeTransactionStatus } from 'Utils/database';
import { WAITING_FOR_USER_CONFIRM } from 'Constants/status';

type PropTypes = {
  navigation: NavigationType,
};

const ScanCarScreen = ({ navigation }: PropTypes) => {
  const { callback } = navigation.state.params;
  const loading = useSelector(state => state.qrCode.loading);
  const rental = useSelector(state => state.qrCode.transactionInfo);
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState(null);
  const onBackPress = () => {
    navigation.pop();
  };

  const handleError = errorCode => {
    switch (errorCode) {
      case RENTAL_NOT_FOUND_CAR:
        return {
          description: 'Car could not be found',
          confirmLabel: 'Scan again',
        };
      case RENTAL_CAR_NOT_MATCH_ADDRESS:
        return {
          description: "This car doesn't belong to this hub",
          confirmLabel: 'Scan again',
        };
      case RENTAL_NOT_MATCH_CAR_MODEL:
        return {
          popupType: 'confirm',
          title: 'Caution!',
          description:
            'This car is not match to the car model user request. Continue?',
          onConfirm() {
            // changeTransactionStatus(
            //   rental._id,
            //   WAITING_FOR_USER_CONFIRM,
            //   car._id
            // );
            // setPopUpData(dispatch)({
            //   popupType: 'confirm',
            //   acceptOnly: true,
            //   title: 'Wait for user confirm',
            // });
            // callback();
          },
        };
      case RENTAL_CAR_ALREADY_IN_USE:
        return {
          description: 'This car already is in use',
          confirmLabel: 'Scan again',
        };
    }
  };

  const onConfirmCar = car => {
    navigation.pop();
    setPopUpData(dispatch)({
      popupType: 'confirm',
      title: `Car detail`,
      description: `Car model: ${car.carModel.name}\nLicense plates: ${car.licensePlates}\nConfirm?`,
      onConfirm() {
        changeTransactionStatus(rental._id, WAITING_FOR_USER_CONFIRM, car._id);
        setPopUpData(dispatch)({
          popupType: 'confirm',
          acceptOnly: true,
          title: 'Wait for user confirm',
        });
        callback();
      },
      onDecline() {
        cancelPopup(dispatch);
        setBarcode(null);
      },
    });
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      let data = null;
      try {
        data = JSON.parse(`${barcodes.data}`);
        setBarcode(barcodes.data);
      } catch (error) {
        setPopUpData(dispatch)({
          acceptOnly: true,
          title: 'Cannot recogize car',
          onConfirm() {
            navigation.pop();
            cancelPopup(dispatch);
          },
        });
        return;
      }

      if (!data || !data._id) {
        Alert.alert('Cannot recogize car');
        return;
      }
      checkAvailableCar(dispatch)(
        { id: data._id, rentalId: rental._id },
        {
          onSuccess(car) {
            if (car.isNotMatch) {
              setPopUpData(dispatch)({
                title: 'Caution!',
                description:
                  'This car is not match to the car model user request. Continue?',
                onConfirm() {
                  onConfirmCar(car);
                },
              });
              return;
            }
            onConfirmCar(car);
          },
          onFailure(errorCode) {
            const popupData = handleError(errorCode);
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Error',
              description: 'Cannot recognize car',
              modalVisible: true,
              grandResponder: false,
              onConfirm() {
                cancelPopup(dispatch);
                setBarcode(null);
              },
              onDecline() {
                cancelPopup(dispatch);
                navigation.pop();
              },
              ...popupData,
            });
          },
        }
      );
    }
  };

  return (
    <ViewContainer
      title="Scanning car"
      haveBackHeader
      onBackPress={onBackPress}
      style={{ paddingHorizontal: 0 }}
      loading={loading}
    >
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
    </ViewContainer>
  );
};

export default ScanCarScreen;
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
    // width: '100%',
  },
});
