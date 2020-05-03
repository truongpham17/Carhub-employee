import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, ButtonGroup } from 'Components';
import ViewPager from '@react-native-community/viewpager';
import { connect, useDispatch, useSelector } from 'react-redux';

import { getRentalList } from '@redux/actions/rental';
import { getLeaseList } from '@redux/actions/lease';

import { NavigationType } from 'types';
// import { dimension } from 'Constants';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { changeTransactionStatus } from 'Utils/database';
import { SearchBar } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import ListRequestRentalScreen from '../list-request-rental-screen/ListRequestRentalScreen';
import ListRequestLeaseScreen from '../list-request-lease-screen/ListRequestLeaseScreen';

type PropTypes = {
  navigation: NavigationType,
  getRentalList: () => void,
};

const RequestScreen = ({ navigation, getRentalList }: PropTypes) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  // const rentalList = useSelector(state =>  state.rental.rentals)  || [];
  // const leaseList = useSelector(state =>  state.lease.leases)  || [];
  useEffect(() => {
    // getRentalList();
    // getLeaseList(dispatch)();
    // changeTransactionStatus('123', 'hello friend');
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const viewPagerRef = useRef(null);

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
      title="Request List"
      onBackPress={onBackPress}
      haveBack={false}

      // haveRight
      // rightIcon="scan"
      // onRightPress={() => navigation.navigate('ScanScreen')}
    >
      <ButtonGroup
        // theme={theme}
        activeIndex={activeIndex}
        labels={['Rent booking', 'Lease request']}
        onItemPress={onTabPress}
      />
      <SearchBar
        placeholder="Customer name"
        showCancel={false}
        onChangeText={setSearch}
        value={search}
        inputStyle={textStyle.bodyText}
        // platform="ios"
        containerStyle={styles.search}
        inputContainerStyle={{ backgroundColor: colors.dark90 }}
      />
      <ViewPager
        style={{
          flex: 1,
          marginHorizontal: -scaleHor(24),
          // marginTop: scaleVer(24),
        }}
        initialPage={0}
        onPageSelected={handlePageSelected}
        // scrollEnabled={false}
        ref={ref => (viewPagerRef.current = ref)}
      >
        <View key="1" style={{ paddingHorizontal: scaleHor(24) }}>
          <ListRequestRentalScreen navigation={navigation} search={search} />
        </View>
        <View key="2" style={{ paddingHorizontal: scaleHor(24) }}>
          <ListRequestLeaseScreen navigation={navigation} search={search} />
        </View>
      </ViewPager>
    </ViewContainer>
  );
};

export default connect(
  state => ({
    loading: state.rental.loading,
    rentalList: state.rental.rentals,
  }),
  { getRentalList }
)(RequestScreen);
const styles = StyleSheet.create({
  search: {
    marginVertical: scaleVer(8),
    backgroundColor: 'white',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
