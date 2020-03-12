import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { LeaseType } from 'types';
import { Avatar, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import moment from 'moment';

type PropsType = {
  onItemPress: string => void,
  data: LeaseType,
};

const LeaseItem = ({ onItemPress, data }: PropsType) => {
  const getDetail = () => {
    onItemPress(data._id);
    // goToDetail(item.value);
  };
  return (
    <TouchableOpacity
      onPress={() => onItemPress(data._id)}
      style={styles.button}
    >
      <View style={styles.container}>
        <View style={styles.avtContainer}>
          <Avatar uri={data.customer.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={textStyle.widgetItem}>{data.customer.fullName}</Text>
            {/* <Text style={textStyle.bodyText}>ID: BR0001</Text> */}
            <Text style={textStyle.bodyText}>{data.car.carModel.name}</Text>
            <Text style={textStyle.bodyText}>
              Duration: {moment(data.startDate).format('MMM DD')} -{' '}
              {moment(data.endDate).format('MMM DD')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: scaleVer(8) }}>
        <View style={{ flex: 1, marginEnd: scaleHor(8) }}>
          <Button
            label="Decline"
            colorStart={colors.errorLight}
            colorEnd={colors.error}
          />
        </View>

        <View style={{ flex: 1, marginStart: scaleHor(8) }}>
          <Button label="Accept" />
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
  },
  infoContainer: {
    paddingLeft: scaleHor(24),
    flex: 1,
  },
  button: {
    borderBottomColor: colors.dark80,
    borderBottomWidth: 1,
    paddingHorizontal: scaleHor(12),
    paddingVertical: scaleVer(12),
    marginVertical: scaleVer(8),
  },
});

export default LeaseItem;
