import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'Components';

import { useSelector } from 'react-redux';

import { NavigationType, CarModelReport } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const CarModelDetail = () => {
  const carModels = useSelector(state => state.statistic.carModels);

  const selectedId = useSelector(state => state.statistic.selectedCarModel);
  const selectedCarModel: CarModelReport = carModels.find(
    carModel => carModel.carModel._id === selectedId
  );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ListItem
        type="detail"
        label="Model"
        detail={selectedCarModel.carModel.name}
        showSeparator
      />
      <ListItem
        type="detail"
        label="Total hub's car quantity"
        detail={selectedCarModel.hubQuantity}
        showSeparator
      />
      <ListItem
        type="detail"
        label="Total current car"
        detail={selectedCarModel.currentQuantity}
        showSeparator
      />
      <ListItem
        type="detail"
        label="        Hub"
        detail={
          selectedCarModel.currentQuantity -
          selectedCarModel.customerQuantity -
          selectedCarModel.otherHubQuantity
        }
        showSeparator
      />
      <ListItem
        type="detail"
        label="        Other hub"
        detail={selectedCarModel.otherHubQuantity}
        showSeparator
      />
      <ListItem
        type="detail"
        label="        Customer"
        detail={selectedCarModel.customerQuantity}
        showSeparator
      />
      <ListItem
        type="detail"
        label="Upcomming leaving"
        detail={selectedCarModel.upCommingLeaving}
        showSeparator
      />
      <ListItem
        type="detail"
        label="Upcomming receiving"
        detail={selectedCarModel.upCommingReceive}
      />
    </ScrollView>
  );
};

export default CarModelDetail;
const styles = StyleSheet.create({});
