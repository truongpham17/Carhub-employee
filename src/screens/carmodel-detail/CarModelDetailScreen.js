import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ViewContainer, ListItem, Button, ButtonGroup } from 'Components';

import { useDispatch, useSelector } from 'react-redux';
import ViewPager from '@react-native-community/viewpager';

import { NavigationType, CarModelReport } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import CarList from './CarList';
import CarModelDetail from './CarModelDetail';

type PropTypes = {
  navigation: NavigationType,
};

const CarModelDetailScreen = ({ navigation }: PropTypes) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const viewPagerRef = useRef(null);
  const carModels = useSelector(state => state.statistic.carModels);

  const selectedId = useSelector(state => state.statistic.selectedCarModel);
  const selectedCarModel: CarModelReport = carModels.find(
    carModel => carModel.carModel._id === selectedId
  );

  const onTabPress = index => {
    if (index !== activeIndex) {
      viewPagerRef.current.setPage(index);
      setActiveIndex(index);
    }
  };
  const handlePageSelected = e => {
    const { position } = e.nativeEvent;
    if (position !== activeIndex) {
      setActiveIndex(position);
    }
  };

  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Car model detail"
      onBackPress={onBackPress}
      haveRight
      rightIcon={activeIndex === 1 ? 'filter' : ''}
      onRightPress={() => setFilterVisible(true)}
    >
      <ButtonGroup
        // theme={theme}
        activeIndex={activeIndex}
        labels={['Information', 'Car list']}
        onItemPress={onTabPress}
      />
      <ViewPager
        style={{
          flex: 1,
          marginHorizontal: -scaleHor(24),
          marginTop: scaleVer(24),
        }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        ref={ref => (viewPagerRef.current = ref)}
      >
        <View key="1" style={{ paddingHorizontal: scaleHor(24) }}>
          <CarModelDetail />
        </View>
        <View key="2" style={{ paddingHorizontal: scaleHor(24) }}>
          <CarList
            filterVisible={filterVisible}
            onCloseFilter={() => setFilterVisible(false)}
            navigation={navigation}
          />
        </View>
      </ViewPager>
    </ViewContainer>
  );
};

export default CarModelDetailScreen;
const styles = StyleSheet.create({});
