import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer } from 'Constants/dimensions';

// navigation.state.routeName
const TAB_NAME = ['RequestStack', 'ManageStack', 'ProfileStack'];
const routeConfig = [
  {
    icon: 'menu',
    title: 'Request',
  },
  {
    icon: 'book',
    title: 'Manage',
  },
  {
    icon: 'user',
    title: 'Profile',
  },
];

const TabIcon = ({ icon, title, onPress, color }) => (
  <TouchableWithoutFeedback onPress={onPress} key={title}>
    <View>
      <Icon name={icon} type="feather" size={20} color={color} />
      <Text style={[textStyle.bodyText, { color }]}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

class TabBar extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    const { index } = navigation.state;
    const colorArr = TAB_NAME.map((item, idx) =>
      idx === index ? colors.primary : colors.dark60
    );
    return (
      // <View style={{ backgroundColor: colors.primaryLight }}>
      <SafeAreaView
        style={{
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.dark80,
          // marginTop: scaleVer(12),
        }}
      >
        <View style={styles.containerStyle}>
          {routeConfig.map((item, idx) => (
            <TabIcon
              icon={item.icon}
              title={item.title}
              onPress={() => navigation.navigate(TAB_NAME[idx])}
              color={colorArr[idx]}
              key={idx}
            />
          ))}
        </View>
      </SafeAreaView>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 6,
    paddingTop: 12,
    // borderTopRightRadius: 24,
    // borderTopLeftRadius: 24,
    overflow: 'hidden',
    elevation: 12,
  },
});

export default withNavigation(TabBar);
