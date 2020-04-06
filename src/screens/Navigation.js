import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Tabbar, Popup } from 'Components';
import { cancelPopup } from '@redux/actions/app';
import ScanScreen from './scan-screen/ScanScreen';
import RentDetailScreen from './rent-detail-screen/RentDetailScreen';
import RequestScreen from './request-screen/RequestScreen';
import SignInScreen from './sign-in-screen/SignInScreen';
import ManageScreen from './manage-screen/ManageScreen';
import CarModelDetail from './carmodel-detail/CarModelDetailScreen';
import CarDetailScreen from './car-detail-screen/CarDetailScreen';
import EditCarScreen from './edit-car-screen/EditCarScreen';
import ScanCarScreen from './scan-car-screen/ScanCarScreen';

const RequestStack = createStackNavigator(
  {
    RequestScreen,
    RentDetailScreen,
    ScanScreen,
    ScanCarScreen,
  },
  { headerMode: 'none' }
);

const ManageStack = createStackNavigator(
  {
    ManageScreen,
    CarModelDetail,
    CarDetailScreen,
    EditCarScreen,
  },
  {
    headerMode: 'none',
  }
);

const MainApp = createBottomTabNavigator(
  {
    RequestStack,
    ManageStack,
  },
  {
    tabBarComponent: Tabbar,
  }
);

const AuthStack = createStackNavigator({
  SignInScreen,
});

const AppNavigation = createSwitchNavigator({
  AuthStack,
  MainApp,
});

const App = createAppContainer(AppNavigation);

const AppWithPopUp = () => {
  const { popup } = useSelector(state => state.app);

  const dispatch = useDispatch();

  const onClosePopup = () => {
    if (typeof popup.onClose === 'function') {
      popup.onClose();
    } else {
      cancelPopup(dispatch);
    }
  };

  const onConfirmPopup = data => {
    if (typeof popup.onConfirm === 'function') {
      popup.onConfirm(data);
    } else {
      cancelPopup(dispatch);
    }
  };
  const onDeclinePopup = data => {
    if (typeof popup.onDecline === 'function') {
      popup.onDecline(data);
    } else {
      cancelPopup(dispatch);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <App />
      <Popup
        {...popup}
        onClose={onClosePopup}
        onConfirm={onConfirmPopup}
        onDecline={onDeclinePopup}
      />
    </View>
  );
};

export default AppWithPopUp;
