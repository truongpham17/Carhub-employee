import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { LeaseType, NavigationType } from 'types';
import { Avatar, Button, ImageSlider } from 'Components';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import moment from 'moment';

import { connect, useDispatch } from 'react-redux';

type PropsType = {
  onItemPress: string => void,
  data: LeaseType,
  navigation: NavigationType,
  onAccept: () => void,
  onDecline: () => void,
};

const RequestLeaseItem = ({
  onItemPress,
  data,
  onAccept,
  onDecline,
}: PropsType) => {
  const dispatch = useDispatch();
  const getDetail = () => {
    onItemPress(data._id);
    // goToDetail(item.value);
  };

  const label = getLabel(data.status);
  return (
    <TouchableOpacity
      onPress={() => onItemPress(data._id)}
      style={styles.button}
    >
      <View style={styles.container}>
        {/* <View style={styles.avtContainer}>
          <Avatar uri={data.customer.avatar} />
        </View> */}
        <View style={styles.infoContainer}>
          <View style={styles.title}>
            <Text style={textStyle.widgetItem}>{data.customer.fullName}</Text>
            <Text style={[textStyle.bodyTextBold, { color: label.color }]}>
              {label.content}
            </Text>
          </View>

          <Text style={textStyle.bodyText}>{data.car.carModel.name}</Text>
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
  },
  infoContainer: {
    paddingLeft: scaleHor(24),
    flex: 1,
  },
  button: {
    borderBottomColor: colors.dark80,
    borderBottomWidth: 1,
    paddingHorizontal: scaleHor(12),
    paddingVertical: scaleVer(8),
    marginVertical: scaleVer(8),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default RequestLeaseItem;
