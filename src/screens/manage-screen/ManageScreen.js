import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ViewContainer, ListItem } from 'Components';
import { getHubCarList, setSelectedCarModel } from '@redux/actions/statistic';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationType, CarModelReport } from 'types';
import { changeTransactionStatus } from 'Utils/database';
import { SearchBar, Icon } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer } from 'Constants/dimensions';
import ManageItem from './ManageItem';

type PropTypes = {
  navigation: NavigationType,
};

const ManageScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  const [search, setSearch] = useState('');
  const carModels: [CarModelReport] = useSelector(
    state => state.statistic.carModels
  );
  const loading = useSelector(state => state.statistic.loading);
  useEffect(() => {
    if (refreshing) {
      getHubCarList(dispatch)();
      setRefreshing(false);
    }
    // changeTransactionStatus('fdsafsda', 'hello');
  }, [refreshing]);
  const onBackPress = () => {
    navigation.pop();
  };

  const onItemPress = id => {
    setSelectedCarModel(dispatch)(id);
    navigation.navigate('CarModelDetail');
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Manage car"
      haveBack={false}
      onBackPress={onBackPress}
      loading={loading}
    >
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBar
          placeholder="Car model"
          showCancel={false}
          onChangeText={setSearch}
          value={search}
          inputStyle={textStyle.bodyText}
          // platform="ios"
          containerStyle={styles.search}
          inputContainerStyle={{ backgroundColor: colors.dark90 }}
        />
        <Icon
          name="filter"
          type="feather"
          containerStyle={{ marginBottom: scaleVer(12) }}
          // onPress={}
        />
      </View>

      <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        data={carModels.filter(item => item.carModel.name.includes(search))}
        renderItem={({ item }) => (
          <ManageItem
            type="detail"
            name={item.carModel.name}
            quantity={item.currentQuantity}
            onItemPress={() => onItemPress(item.carModel._id)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ViewContainer>
  );
};

export default ManageScreen;
const styles = StyleSheet.create({
  search: {
    marginBottom: scaleVer(16),
    backgroundColor: 'white',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
  },
});
