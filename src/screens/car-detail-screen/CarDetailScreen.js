import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  ViewContainer,
  Button,
  ListItem,
  ModalContainer,
  ConfirmPopup,
} from 'Components';

import { connect, useDispatch, useSelector } from 'react-redux';

import { NavigationType, CarType } from 'types';
import { updateCar, removeCar, getHubCarList } from '@redux/actions/statistic';
import colors from 'Constants/colors';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';

import { setPopUpData, cancelPopup } from '@redux/actions';
import EditCar from './EditCar';

type PropTypes = {
  navigation: NavigationType,
};

const CarDetailScreen = ({ navigation }: PropTypes) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const selectedId = useSelector(state => state.statistic.selectedCar);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.statistic.loadingUpdateCar);
  const loadingRemoveCar = useSelector(
    state => state.statistic.loadingRemoveCar
  );
  const hub = useSelector(state => state.statistic.hub);

  const allCarFromHub: [CarType] = useSelector(
    state => state.statistic.allCarFromHub
  );

  console.log(allCarFromHub);
  const selectedCar: CarType = allCarFromHub.find(
    car => car._id === selectedId
  ) || {
    carModel: {},
  };

  const onBackPress = () => {
    navigation.pop();
  };

  const handleEditCar = data => {
    setModalVisible(false);
    updateCar(dispatch)({ ...data, _id: selectedId });
  };

  const handleRemoveCar = () => {
    setConfirmVisible(false);
    removeCar(dispatch)(selectedId, {
      onSuccess() {
        // navigation.navigate('ManageScreen');
        navigation.pop();

        getHubCarList(dispatch)({});
      },
      onFailure() {
        console.log('error');
      },
    });
  };

  const showRemoveButton = () =>
    selectedCar.customer || selectedCar.hub !== hub._id;
  console.log(selectedCar);

  const onRemoveAsk = () => {
    setPopUpData(dispatch)({
      popupType: 'confirm',
      title: 'Remove car',
      description: 'Are you sure you want to remove this car',
      onConfirm() {
        cancelPopup(dispatch);
        handleRemoveCar();
      },
    });
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Car detail"
      onBackPress={onBackPress}
      loading={loading || loadingRemoveCar}
    >
      <ScrollView>
        {selectedCar.customer && (
          <ListItem
            type="detail"
            label="Customer"
            detail={selectedCar.customer.fullName}
            pressable
            onItemPress={() => {
              setPopUpData(dispatch)({
                popupType: 'profile',
                description: selectedCar.customer,
              });
            }}
            nextIcon="next"
            showSeparator
          />
        )}
        <ListItem
          type="detail"
          label="Model"
          detail={selectedCar.carModel.name}
          showSeparator
        />

        <ListItem
          type="detail"
          label="License plates"
          detail={selectedCar.licensePlates}
          showSeparator
        />

        <ListItem
          type="detail"
          label="Using year"
          detail={selectedCar.usingYear}
          showSeparator
        />

        <ListItem
          type="detail"
          label="Odometer"
          detail={selectedCar.odometer}
          showSeparator
        />

        <ListItem
          type="detail"
          label="Color"
          detail={selectedCar.color}
          showSeparator
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          marginTop: scaleVer(8),
          marginBottom: scaleVer(16),
        }}
      >
        <View style={{ flex: 1, marginEnd: scaleHor(8) }}>
          {!showRemoveButton() && (
            <Button
              label="Remove"
              colorStart={colors.errorLight}
              colorEnd={colors.error}
              disable={selectedCar.customer || selectedCar.hub !== hub._id}
              onPress={onRemoveAsk}
            />
          )}
        </View>
      </View>
    </ViewContainer>
  );
};

export default connect(state => ({}), {})(CarDetailScreen);
const styles = StyleSheet.create({});
