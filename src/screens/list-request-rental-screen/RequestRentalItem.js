import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { RentalType } from 'types';
import { Avatar } from 'Components';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import moment from 'moment';

type PropsType = {
  data: RentalType,
  onItemPress: string => void,
};

const RequestRentalItem = ({ onItemPress, data }: PropsType) => {
  const getDetail = () => {
    // goToDetail(item.value);
    onItemPress(data._id);
  };
  return (
    <TouchableOpacity onPress={getDetail}>
      <View style={styles.container}>
        {/* <View style={styles.avtContainer}>
          <Avatar uri={data.customer.avatar} />
        </View> */}
        <View style={styles.infoContainer}>
          <View>
            <Text style={textStyle.widgetItem}>{data.customer.fullName}</Text>
            <Text style={textStyle.bodyText}>{data.carModel.name}</Text>
            <Text style={textStyle.bodyText}>
              Duration: {moment(data.startDate).format('MMM DD')} -{' '}
              {moment(data.endDate).format('MMM DD')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: scaleVer(8),
    borderBottomColor: colors.dark80,
    borderBottomWidth: 1,
    paddingHorizontal: scaleHor(12),
    paddingVertical: scaleVer(8),
  },
  infoContainer: {
    paddingLeft: scaleHor(24),
    flex: 1,
  },
});

export default RequestRentalItem;
