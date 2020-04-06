import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { getTransationInfo } from '@redux/actions/qrCode';
import BarcodeMask from 'react-native-barcode-mask';
import { NavigationType } from 'types';
import { useSelector, useDispatch } from 'react-redux';
import { setPopUpData } from '@redux/actions/app';
import { processLeaseRequest, processRentalRequest } from './utils';

type PropTypes = {
  setQRCodeInfo: () => void,
  navigation: NavigationType,
};
const ScanQrCodeScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState(null);

  const loadInfo = async data => {
    const transactionInfo = await getTransationInfo(data);
    console.log(transactionInfo);

    if (!transactionInfo) {
      setPopUpData(dispatch)({
        popupType: 'error',
        title: 'Error',
        description: 'Can not find this request. Please try to scan again!',
        onConfirm() {
          setBarcode(null);
        },
      });
    }

    if (transactionInfo.transactionType === 'rental') {
      processRentalRequest({ transactionInfo, navigation, dispatch });
    } else {
      processLeaseRequest({ transactionInfo, navigation, dispatch });
    }

    setBarcode(null);
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      loadInfo({ ...JSON.parse(`${barcodes.data}`) });
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
export default ScanQrCodeScreen;
