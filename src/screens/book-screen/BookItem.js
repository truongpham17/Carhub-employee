import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  title: String,
  description: String,
};

const BookItem = ({ title, description }: PropTypes) => (
  <View style={styles.container}>
    <Text style={textStyle.widgetItem}>{title}</Text>
    <Text style={textStyle.bodyText}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,

    ...shadowStyle.ELEVATION_3,
    padding: 12,
    backgroundColor: colors.white,
  },
});

export default BookItem;
