import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ViewContainer } from 'Components';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const AuthScreen = ({ navigation }: PropTypes) => {
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (user.token) {
      navigation.navigate('MainApp');
    } else {
      navigation.navigate('SignInStack');
    }
  }, []);
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating />
    </View>
  );
};

export default AuthScreen;
const styles = StyleSheet.create({});
