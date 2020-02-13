/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
// @flow
import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  StyleProp,
  ViewStyle,
  BackHandler,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { GET_APP_DATA } from 'Apollo/graphql/queries';

import { loading as loadingAnimated } from 'Assets/animation';

import { dimension, i18n } from 'Constants';
import { useQuery } from '@apollo/react-hooks';
import { themeType } from 'types/theme';
import { language } from 'Constants/i18n/type';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import ErrorFeedback from './ErrorFeedback';
import FadedContainer from './FadedContainer';
import ConfirmPopup from './ConfirmPopup';
import BackTitle from './BackTitle';
import { withTheme } from './ThemeProvider';

type BackTitleTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  backType?: 'back' | 'exit',
  onBackPress: () => void,
};

type PropTypes = {
  style: StyleProp<ViewStyle>,
  containerStyle: StyleProp<ViewStyle>,
  children: React.Node,
  scrollable: ?boolean,
  tabbarComponent?: {},
  loading: boolean,
  requestError?: {},
  isErrorImportant?: boolean,
  onErrorPress?: () => void,
  dismissLoading?: boolean,
  exposeTime?: number,
  handleBack?: boolean,
  backAction?: () => void,
  showBackPopup?: boolean,
  haveBackHeader?: boolean,
  barStyle?: 'dark-content' | 'light-content',
  theme: themeType,
} & BackTitleTypes;

// eslint-disable-next-line react/display-name
const ViewContainer = ({
  style,
  containerStyle,
  children,
  scrollable,
  tabbarComponent,
  loading = false,
  requestError,
  onErrorPress,
  dismissLoading = true,
  exposeTime = 10000,
  handleBack,
  backAction = () => {},
  showBackPopup,

  haveBackHeader = false,
  haveBack = true,
  title,
  haveRight,
  rightIcon,
  onRightPress,
  backType = 'back',
  theme,
  ...next
}: PropTypes) => {
  const [isLoading, setLoading] = useState(false);
  const [errorData, setError] = useState(null);
  const [backVisible, setBackVisible] = useState(false);

  const backController = handleBack => {
    console.log(handleBack);
    if (handleBack) {
      if (showBackPopup) {
        setBackVisible(true);
      } else {
        backAction();
      }
    }
    return handleBack;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backController(handleBack)
    );
    return () => {
      backHandler.remove();
    };
  }, [showBackPopup]);

  useEffect(() => {
    if (isLoading === loading) return;
    setLoading(loading);
    if (dismissLoading) {
      setTimeout(() => {
        if (loading) {
          setLoading(false);
        }
      }, exposeTime);
    }
  }, [loading]);

  useEffect(() => {
    if (!requestError) return;
    if (requestError) {
      /**
       * @implementation request get token
       */
      setError({
        errorType: 'server',
        label: 'Your token has been expired, please logout and login again!',
      });
    } else {
      setError({
        errorType: 'server',
        label: 'Oh no! There is an unknown error',
      });
    }

    setTimeout(() => {
      if (errorData) {
        setError(null);
      }
    }, 6000);
  }, [requestError]);

  const renderLoading = () => (
    <FadedContainer visible={isLoading}>
      <LottieView autoPlay source={loadingAnimated} />
    </FadedContainer>
  );

  const renderBackTitle = () =>
    haveBackHeader && (
      <BackTitle
        haveBack={haveBack}
        title={title}
        haveRight={haveRight}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
        type={backType}
        onBackPress={() => backController(true)}
        theme={theme}
        backType={backType}
      />
    );

  const renderBackPopup = () =>
    showBackPopup && (
      <ConfirmPopup
        modalVisible={backVisible}
        onClose={() => setBackVisible(false)}
        onConfirm={() => {
          setBackVisible(false);
          setTimeout(() => {
            backAction();
          }, 100);
        }}
        title={i18n.t(language.exit.title)}
        description={i18n.t(language.exit.description)}
        cancelLabel={i18n.t(language.exit.close)}
        confirmLabel={i18n.t(language.exit.exit)}
      />
    );

  const renderChildren = () => (
    <View style={[styles.containerStyle, { flex: 1 }, style]}>
      {renderBackTitle()}
      {children}
    </View>
  );

  // const renderBackPopup = () => <FadedContainer visible={backVisible}></FadedContainer>;

  const renderTabbarNoScroll = () => (
    <React.Fragment>
      {renderChildren()}
      {tabbarComponent}
    </React.Fragment>
  );

  const renderTabbarScroll = () => (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={[styles.containerStyle, style]}
        // keyboardDismissMode="none"
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderBackTitle()}
        {children}
      </ScrollView>
      {tabbarComponent}
    </React.Fragment>
  );

  const renderNoTabbarScroll = () => (
    <ScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      // keyboardDismissMode="none"
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      {renderBackTitle()}
      {children}
    </ScrollView>
  );

  const renderComponent = () => {
    if (!scrollable && !tabbarComponent) {
      return renderChildren();
    }
    if (!scrollable && tabbarComponent) {
      return renderTabbarNoScroll();
    }
    if (scrollable && !tabbarComponent) {
      return renderNoTabbarScroll();
    }
    if (scrollable && tabbarComponent) {
      return renderTabbarScroll();
    }
  };
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: theme.white }, containerStyle]}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      {renderComponent()}
      {renderLoading()}
      {renderBackPopup()}
      {errorData && (
        <ErrorFeedback
          onErrorPress={onErrorPress}
          {...errorData}
          theme={theme}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: scaleVer(24),
    paddingHorizontal: scaleHor(24),
  },
  absoluteStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default ViewContainer;
