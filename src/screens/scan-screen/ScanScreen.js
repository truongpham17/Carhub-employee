import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { getTransationInfo, setTransactionInfo } from '@redux/actions/qrCode';
import BarcodeMask from 'react-native-barcode-mask';
import { NavigationType } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { setPopUpData, cancelPopup } from '@redux/actions/app';
import { ViewContainer } from 'Components';
import processRentalRequest from './rental.utils';
import processLeaseRequest from './lease.utils';

type PropTypes = {
  setQRCodeInfo: () => void,
  navigation: NavigationType,
};
const ScanQrCodeScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState(null);
  const { id } = navigation.state.params;
  const loading = useSelector(state => state.qrCode.loading);

  const loadInfo = async data => {
    const transactionInfo = await getTransationInfo(dispatch)(data);
    if (transactionInfo._id !== id) {
      return setPopUpData(dispatch)({
        popupType: 'error',
        title: 'Error',
        description: "Contract id doesn't match",
      });
    }
    if (!transactionInfo) {
      setPopUpData(dispatch)({
        popupType: 'error',
        title: 'Error',
        description: 'Can not find this request. Please try to scan again!',
        onConfirm() {
          setBarcode(null);
          cancelPopup(dispatch);
          navigation.pop();
        },
      });
    }

    if (transactionInfo.transactionType === 'rental') {
      setTransactionInfo(dispatch)(transactionInfo);
      processRentalRequest({ transactionInfo, navigation, dispatch });
    } else {
      setTransactionInfo(dispatch)(transactionInfo);
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
    <ViewContainer safeArea={false} loading={loading} style={styles.container}>
      {/* {loading && (
        <View style={{ position: 'absolute', zIndex: 2 }}>
          <ActivityIndicator animating />
        </View>
      )} */}

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
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
