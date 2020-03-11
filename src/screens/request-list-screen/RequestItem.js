import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { Avatar } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';

type PropsType = {
  goToDetail: () => void,
  item: String,
};

const RequestItem = ({ goToDetail, item }: PropsType) => {
  const getDetail = () => {
    goToDetail(item.value);
  };
  return (
    <TouchableOpacity onPress={getDetail}>
      <View style={styles.container}>
        <View style={styles.avtContainer}>
          <Avatar
            size="medium"
            rounded
            source={{
              uri:
                'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={textStyle.widgetItem}>Thao Nguyen</Text>
            <Text style={textStyle.bodyText}>ID: BR0001</Text>
            <Text style={textStyle.bodyText}>Audi V4 | Aug 20 - Oct 20</Text>
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
    paddingVertical: scaleVer(12),
  },
  infoContainer: {
    paddingLeft: scaleHor(24),
    flex: 1,
  },
});

export default RequestItem;
