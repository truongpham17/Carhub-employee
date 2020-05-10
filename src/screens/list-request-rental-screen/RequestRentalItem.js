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

  const label = getLabel(data.status);
  return (
    <TouchableOpacity onPress={getDetail}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.title}>
            <Text style={textStyle.widgetItem}>{data.customer.fullName}</Text>
            <Text style={[textStyle.bodyTextBold, { color: label.color }]}>
              {label.content}
            </Text>
          </View>
          <Text style={textStyle.bodyText}>{data.carModel.name}</Text>
          <Text style={textStyle.bodyText}>
            Duration: {moment(data.startDate).format('MMM DD')} -{' '}
            {moment(data.endDate).format('MMM DD')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getLabel = status => {
  switch (status) {
    // case 'ACCEPTED':
    //   return { content: 'ACCEPTED', color: colors.primary };
    // case 'PENDING':
    //   return { content: 'PENDING', color: colors.primary };
    // case 'AVAILABLE':
    //   return { content: 'AVAILABLE', color: colors.primary };
    case 'DECLINED':
      return { content: 'DECLINED', color: colors.error };
    default:
      return { content: status, color: colors.primary };
  }
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
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default RequestRentalItem;
