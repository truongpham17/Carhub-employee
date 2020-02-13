import React, { useRef } from 'react';
import { View, Platform, StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { useComponentDidAppear } from 'Utils/Navigation';

type PropTypes = {
  source: {},
  componentId: string,
  containerStyle?: StyleProp<ViewStyle>,
};

const LottieContainer = ({
  source,
  componentId,
  containerStyle = { flex: 1, alignSelf: 'stretch' },
}: PropTypes) => {
  const lottieRef = useRef(null);
  // useComponentDidAppear(componentId, () => {
  //   console.log('did appear', componentId)
  //   if (Platform.OS === 'ios') {
  //     if (lottieRef.current) {
  //       lottieRef.current.play();
  //     }
  //   }
  // });

  return (
    <View style={{ flex: 1, alignSelf: 'stretch' }}>
      <LottieView
        source={source}
        autoPlay
        loop
        ref={ref => (lottieRef.current = ref)}
      />
    </View>
  );
};

export default LottieContainer;
