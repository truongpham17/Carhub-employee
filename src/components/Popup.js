import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import ModalContainer from './ModalContainer';
import ConfirmPopup from './ConfirmPopup';
import StatusDialog from './StatusDialog';
import PromptDialog from './PromptDialog';
import ProfilePopup from './ProfilePopup';
import SurveyPopup from './SurveyPopup';

type PropTypes = {
  popupType: String,
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  grandResponder: Boolean,
};

const NINETY_PERCENT = ['policy', 'survey'];

const PopUp = (props: PropTypes) => {
  const { popupType, modalVisible, onClose, grandResponder } = props;
  const renderContent = () => {
    switch (popupType) {
      case 'confirm':
        return <ConfirmPopup {...props} />;
      case 'success':
      case 'error':
        return <StatusDialog {...props} />;
      case 'prompt':
        return <PromptDialog {...props} />;
      case 'profile':
        return <ProfilePopup {...props} />;
      case 'survey':
        return <SurveyPopup {...props} />;

      default:
        return null;
    }
  };
  return (
    <ModalContainer
      modalVisible={modalVisible}
      onClose={onClose}
      grantResponder={grandResponder}
    >
      <View
        style={[
          popupType === 'survey' ? styles.surveyStyle : styles.containerStyle,
          NINETY_PERCENT.includes(popupType) ? { width: '90%' } : {},
          // popupType === 'survey' ? { alignItems: 'flex-start' } : {},
        ]}
      >
        {renderContent()}
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
    padding: scaleHor(16),
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surveyStyle: {
    width: '90%',
    padding: scaleHor(16),
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
});

export default PopUp;
