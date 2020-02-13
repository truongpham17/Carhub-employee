import * as React from 'react';
import { View } from 'react-native';
import { textStyle, dimension } from 'Constants';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../TextTheme';
import styles from './styles';

type PropTypes = {
  label: string,
  labelValue: string,
  children: React.Node,
  position: ['top' | 'bottom', 'left' | 'right'],
};

const CardContainer = ({
  label,
  labelValue,
  children,
  position,
}: PropTypes) => {
  const getStyle = () => {
    const style = [
      styles.cardContainer,
      position[0] === 'top'
        ? { paddingBottom: dimension.DISTANCE_1 }
        : { paddingTop: dimension.DISTANCE_1 },
      position[1] === 'left'
        ? { paddingEnd: dimension.DISTANCE_1 }
        : { paddingStart: dimension.DISTANCE_1 },
    ];
    return style;
  };

  return (
    <View style={getStyle()}>
      <LinearGradient
        style={styles.cardContentContaner}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['#D17262', '#905096']}
        locations={[0, 1]}
      >
        <View style={styles.cardLabel}>
          <Text style={[textStyle.text1LightWhite, { color: 'WHITE' }]}>
            {label}
          </Text>
          <Text style={[textStyle.text2White, { color: 'WHITE' }]}>
            {labelValue}
          </Text>
        </View>

        {children}
      </LinearGradient>
    </View>
  );
};

export default CardContainer;
