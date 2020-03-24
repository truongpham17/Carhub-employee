import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ViewContainer, Button, ModalContainer } from 'Components';

import { connect, useDispatch, useSelector } from 'react-redux';

import { NavigationType, CarModelReport, CarType } from 'types';
import { textStyle } from 'Constants/textStyles';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import {
  addCar,
  getHubCarList,
  setSelectedCar,
} from '@redux/actions/statistic';
import { shadowStyle } from 'Constants';
import Separator from 'Components/Separator';
import AddCar from './AddCar';
import Filter from './Filter';
import CarItem from './CarItem';

type PropTypes = {
  navigation: NavigationType,
  filterVisible: Boolean,
  onCloseFilter: () => void,
};

const CarList = ({ navigation, filterVisible, onCloseFilter }: PropTypes) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    all: true,
    hub: true,
    other: true,
    customer: true,
  });

  const [carList, setCarList] = useState([]);

  const allCarFromHub: [CarType] = useSelector(
    state => state.statistic.allCarFromHub
  );

  const hub = useSelector(state => state.statistic.hub);
  const carModels = useSelector(state => state.statistic.carModels);
  const selectedId = useSelector(state => state.statistic.selectedCarModel);

  const selectedCarModel: CarModelReport = carModels.find(
    carModel => carModel.carModel._id === selectedId
  );

  useEffect(() => {
    const listCarWithCarModel = [];
    const allCars = allCarFromHub.filter(
      car => car.carModel._id === selectedId
    );
    if (filter.all) {
      setCarList(allCars);
      return;
    }

    allCars.forEach(car => {
      if (
        (filter.hub && car.hub === hub._id) ||
        (filter.other && car.hub !== hub._id) ||
        (filter.customer && car.customer)
      ) {
        listCarWithCarModel.push(car);
      }
    });
    setCarList(listCarWithCarModel);
  }, [filter, allCarFromHub]);

  const handleAddCar = data => {
    setModalVisible(false);
    addCar(dispatch)(
      {
        carModel: selectedId,
        hub: hub._id,
        currentHub: hub._id,
        odometer: data.odometer,
        usingYear: data.year,
        licensePlates: data.license,
      },
      {
        onSuccess() {
          getHubCarList(dispatch)();
        },
        onFailure() {
          console.log('Error');
        },
      }
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const onCarPress = _id => {
    setSelectedCar(dispatch)(_id);
    navigation.navigate('CarDetailScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={carList}
        renderItem={({ item }) => (
          <CarItem
            number={item.licensePlates}
            type={item.customer ? 'Customer car' : 'Hub car'}
            onItemPress={() => onCarPress(item._id)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        label="Add car"
        style={{ marginBottom: scaleVer(16) }}
        onPress={() => setModalVisible(true)}
      />
      <ModalContainer
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <AddCar onAddCar={handleAddCar} />
      </ModalContainer>
      <Filter
        visible={filterVisible}
        onCancel={onCloseFilter}
        filterProps={filter}
        onSubmit={filter => {
          setFilter(filter);
          onCloseFilter();
        }}
      />
    </View>
  );
};

export default CarList;
const styles = StyleSheet.create({});
