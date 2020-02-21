import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { TestScreen } from './test';

import BookScreen from './book-screen/BookScreen';
import AddBookScreen from './add-book-screen/AddBookScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // TestScreen,
    BookScreen,
    AddBookScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
