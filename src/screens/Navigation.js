import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { TestScreen } from './test';
import SelectCarScreen from './select-car-screen/SelectCarScreen';

const TestNavigator = createStackNavigator(
  {
    SelectCarScreen,
    TestScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
