import React from 'react';
import { View, StyleSheet } from 'react-native';
import { dimension } from 'Constants';
import { Search as SearchIcon } from 'Assets/svgs';
import { themeType } from 'types/theme';
import { TextInput } from 'react-native-gesture-handler';

type PropTypes = {
  theme: themeType,
};

const Search = ({ theme }: PropTypes) => (
  <View
    style={[styles.containerStyle, { backgroundColor: theme.PRIMARY_COLOR_2 }]}
  >
    <SearchIcon />
    <TextInput />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 28,
    borderRadius: 14,
    flexDirection: 'row',
    padding: dimension.DISTANCE_2,
    alignItems: 'center',
    marginBottom: dimension.DISTANCE_1,
  },
});

export default Search;
