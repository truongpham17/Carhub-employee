import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
import { NavigationType, RentalType } from 'types';
import { Avatar } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';

import { connect } from 'react-redux';
import moment from 'moment';

type PropsType = {
  navigation: {
    state: {
      params: {
        data: [{ label: string, value: string }],
        avatar: String,
        name: String,
        type: 'accept-decline' | 'decline' | 'transaction',
        onConfirm: () => void,
        onDecline: () => void,
      },
    },
    goBack: () => void,
  },
};

const RentDetailScreen = ({ navigation }: PropsType) => {
  const {
    data,
    avatar,
    name,
    type,
    onConfirm,
    onDecline,
  } = navigation.state.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDeclineRequest = () => {};

  const renderAction = () => {
    switch (type) {
      case 'accept-decline':
        return (
          <View style={{ flexDirection: 'row', marginTop: scaleVer(8) }}>
            <View style={{ flex: 1, marginEnd: scaleHor(8) }}>
              <Button
                label="Decline"
                colorStart={colors.errorLight}
                colorEnd={colors.error}
                onPress={onDecline}
              />
            </View>

            <View style={{ flex: 1, marginStart: scaleHor(8) }}>
              <Button label="Accept" onPress={onConfirm} />
            </View>
          </View>
        );
      case 'decline':
        return (
          <View style={{ marginTop: scaleVer(8) }}>
            <Button
              label="Decline"
              colorStart={colors.errorLight}
              colorEnd={colors.error}
              onPress={onDecline}
            />
          </View>
        );
      case 'transaction':
        return (
          <View style={{ marginTop: scaleVer(8) }}>
            <Button label="Confirm transaction" onPress={onConfirm} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ViewContainer
      title="Booking Detail"
      haveBackHeader
      onBackPress={handleBackPress}
      scrollable
    >
      <View style={{ flex: 1 }}>
        <View>
          <View style={styles.nameContainer}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: avatar,
              }}
            />
            <Text style={textStyle.widgetTitle}>{name}</Text>
          </View>
        </View>
        <View>
          {data.map((item, index) => (
            <ListItem
              key={item.label}
              label={item.label}
              detail={item.value}
              type="detail"
              pressable={false}
              showSeparator={index !== data.length - 1}
            />
          ))}
        </View>
        {renderAction()}
        {/* <View style={styles.buttonContainer}>
          <Button
            label="Decline Request"
            colorStart={colors.errorLight}
            colorEnd={colors.error}
            onPress={handleDeclineRequest}
          />
        </View> */}
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: scaleVer(16),
  },
  buttonContainer: {
    marginVertical: scaleVer(16),
  },
});

export default connect(state => ({
  data: state.rental.rentals.find(item => item._id === state.rental.selectedId),
  // isLoading: state.rentalsList.isLoading,
}))(RentDetailScreen);
