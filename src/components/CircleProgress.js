import * as React from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';
import { scale, scaleHor } from 'Constants/dimensions';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { dimension } from 'Constants';
import { themeType } from 'types/theme';

const width = dimension.SCREEN_WIDTH;
const size = scaleHor(231);
const strokeWidth = scaleHor(16);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;
const P = 2 * PI * r;
const specialPadding = scaleHor(2);

type PropTypes = {
  progress: number,
  theme: themeType,
};

class CircleProgress extends React.Component<PropTypes> {
  constructor(props) {
    super(props);
    this.animated = new Animated.Value(P);
  }

  componentDidMount() {
    const { progress } = this.props;

    setTimeout(() => {
      Animated.timing(this.animated, {
        toValue: (1 - progress) * P,
        duration: 3000,
        easing: Easing.ease,
      }).start();
    }, 100);

    this.animated.addListener(value => {
      if (this.myAnimatedRef) {
        this.myAnimatedRef.setNativeProps({
          strokeDashoffset: value.value,
        });
      }
    });
  }

  render() {
    const { theme } = this.props;
    return (
      <Svg width={size + 2} height={size + 2} style={styles.container}>
        {/* <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#72C390" />
            <Stop offset="1" stopColor="#4C5CA8" />
          </LinearGradient>
        </Defs> */}
        <Circle
          stroke={theme.primary}
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircle
          ref={ref => (this.myAnimatedRef = ref)}
          stroke={theme.secondary}
          fill="none"
          strokeDasharray={`${P}, ${P}`}
          {...{
            strokeWidth: strokeWidth + specialPadding * 2,
            cx,
            cy,
            r: r - specialPadding,
          }}
          // strokeLinecap="round"
        />
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '270deg' }],
  },
});

export default CircleProgress;
