import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {getTest} from '@redux/actions/user';

type PropTypes = {
  getTest: () => void,
  isSuccess: boolean,
};

const TestScreen = ({isSuccess = false, getTest}: PropTypes) => {
  const a = 12;
  useEffect(() => {
    getTest();
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome you to come to the app</Text>
      <Text>Connect to the server: {isSuccess ? 'success' : 'loading'}</Text>
    </View>
  );
};

export default connect(
  state => ({
    isSuccess: state.user.isSuccess,
  }),
  {getTest}
)(TestScreen);
