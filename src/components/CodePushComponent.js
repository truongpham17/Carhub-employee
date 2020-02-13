import React from 'react';
import codePush from 'react-native-code-push';

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: true,
};

export class CodePushComponent extends React.Component {
  componentDidMount() {
    codePush.notifyAppReady();
  }

  render() {
    return null;
  }
}
export default codePush(codePushOptions)(CodePushComponent);
