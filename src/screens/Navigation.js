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
import ManageScreen from './manage-screen/ManageScreen';
import CarModelDetail from './carmodel-detail/CarModelDetailScreen';
import CarDetailScreen from './car-detail-screen/CarDetailScreen';
import EditCarScreen from './edit-car-screen/EditCarScreen';

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
