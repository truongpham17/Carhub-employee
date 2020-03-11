import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
import { NavigationType } from 'types';
import { Avatar } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { connect } from 'react-redux';

type PropsType = {
  navigation: NavigationType,
};

const showAttr = [
  { att: '_id', label: 'ID' },
  { att: 'startDate', label: 'From date' },
  { att: 'endDate', label: 'To date' },
  { att: 'carId', label: 'Car ID' },
  { att: 'carName', label: 'Car Name' },
  { att: 'cost', label: 'Cost' },
  { att: 'pickupLocation', label: 'Pick up location' },
  { att: 'type', label: 'Type' },
];

const RequestDetailScreen = ({ navigation }: PropsType) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDeclineRequest = () => {};

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
                uri:
                  'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
              }}
            />
            <Text style={textStyle.widgetTitle}>Thao Nguyen</Text>
          </View>
        </View>
        <View>
          {showAttr.map((item, index) => (
            <ListItem
              key={item.att}
              label={item.label}
              detail={item.att}
              type="detail"
              pressable={false}
              showSeparator={index !== showAttr.length - 1}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Decline Request"
            colorStart={colors.errorLight}
            colorEnd={colors.error}
            onPress={handleDeclineRequest}
          />
        </View>
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
  isLoading: state.rentalsList.isLoading,
}))(RequestDetailScreen);
