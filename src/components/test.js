import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import { colors } from 'Constants/color';
// navigation.state.routeName
const TAB_NAME = [
  'DiscoveryScreen',
  'HistoryScreen',
  'CardScreen',
  'UserScreen',
];
const routeConfig = [
  {
    icon: 'paper-plane',
    title: 'Discovery',
  },
  {
    icon: 'archive',
    title: 'Booking',
  },
  {
    icon: 'shopping-cart',
    title: 'Cart',
  },
  {
    icon: 'user',
    title: 'Profile',
  },
];
class TabBar extends React.PureComponent {
  renderTabIcon = ({ icon, title, onPress, color }) => (
    <TouchableWithoutFeedback onPress={onPress} key={title}>
      <View>
        <Icon name={icon} type="entypo" size={20} color={color} />
        <Text style={[textStyle.smallDark, { color }]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { navigation } = this.props;
    const { index } = navigation.state;
    const colorArr = TAB_NAME.map((item, idx) =>
      idx === index ? colors.white : colors.primaryDark
    );
    return (
      // <View style={{ backgroundColor: colors.primaryLight }}>
      <View style={styles.containerStyle}>
        {routeConfig.map((item, idx) =>
          this.renderTabIcon({
            icon: item.icon,
            title: item.title,
            onPress: () => navigation.navigate(TAB_NAME[idx]),
            color: colorArr[idx],
          })
        )}
      </View>
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
    paddingTop: 6,
    backgroundColor: '#ce93d8',
    // borderTopRightRadius: 24,
    // borderTopLeftRadius: 24,
    overflow: 'hidden',
    elevation: 12,
  },
});
export default withNavigation(TabBar);
