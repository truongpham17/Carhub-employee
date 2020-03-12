import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Tabbar } from 'Components';
import ScanScreen from './scan-screen/ScanScreen';
import RentDetailScreen from './rent-detail-screen/RentDetailScreen';
import RequestScreen from './request-screen/RequestScreen';
import SignInScreen from './sign-in-screen/SignInScreen';

const RequestStack = createStackNavigator(
  {
    RequestScreen,
    RentDetailScreen,
  },
  { headerMode: 'none' }
);

const ScanStack = createStackNavigator(
  {
    ScanScreen,
    RentDetailScreen,
  },
  {
    headerMode: 'none',
  }
);

const MainApp = createBottomTabNavigator(
  {
    RequestStack,
    ScanStack,
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
export default App;
