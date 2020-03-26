import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';

import BarcodeMask from 'react-native-barcode-mask';

import { connect, useDispatch } from 'react-redux';

import { NavigationType } from 'types';
import { ViewContainer } from 'Components';
import { getCar } from '@redux/actions/statistic';
import { scaleHor } from 'Constants/dimensions';

type PropTypes = {
  navigation: NavigationType,
};

const ScanCarScreen = ({ navigation }: PropTypes) => {
  const { onSuccess } = navigation.state.params;
  const dispatch = useDispatch();
  const [barcode, setBarcode] = useState(null);
  const onBackPress = () => {
    navigation.pop();
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      const data = JSON.parse(`${barcodes.data}`);
      console.log(data);
      if (!data._id) {
        Alert.alert('Cannot recogize car');
        return;
      }
      getCar(dispatch)(data._id, {
        onSuccess(data) {
          console.log(data);
          onSuccess(data);
        },
        onFailure() {
          Alert.alert('Cannot recognize car');
        },
      });
      // setQRCodeInfo(JSON.parse(`${barcodes.data}`));
    }
  };

  return (
    <ViewContainer
      title="Scanning car"
      haveBackHeader
      onBackPress={onBackPress}
      style={{ paddingHorizontal: 0 }}
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
