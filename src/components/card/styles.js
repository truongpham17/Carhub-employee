import { StyleSheet } from 'react-native';
import { dimension, textStyle, color } from 'Constants';

export default StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    // flexGrow: 2,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardContainer: {
    width: '50%',
    height: '50%',
    // alignSelf: 'stretch',
  },

  cardContentContaner: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#305D89',
  },

  cardContent: {
    alignItems: 'flex-end',
  },
  cardLabel: {
    position: 'absolute',
    top: dimension.DISTANCE_2,
    left: dimension.DISTANCE_2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footerText: {
    marginTop: dimension.DISTANCE_2,
  },
});
