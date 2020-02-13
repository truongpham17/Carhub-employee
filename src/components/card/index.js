import React from 'react';
import { View } from 'react-native';
import { Text } from 'Component';

import { textStyle, i18n } from 'Constants';
import { language } from 'Constants/i18n/type';
import styles from './styles';
import CardContainer from './CardContainer';

type PropTypes = {
  label: string,
  labelValue: string,
  type: 'duration' | 'time-point' | 'count',
  day: number,
  hour?: number,
  year?: number,
  month?: string,
  dayInWeek?: string,
  position: ['top' | 'bottom', 'left' | 'right'],
  ord?: string,
};

const Card = ({
  label,
  labelValue,
  type,
  day,
  hour,
  year,
  month,
  dayInWeek,
  position,
  ord,
}: PropTypes) => {
  const getContent = () => {
    switch (type) {
      case 'duration':
        return (
          <View style={styles.cardContent}>
            <Text style={{ ...textStyle.text7, marginTop: 12, color: 'WHITE' }}>
              {day}
            </Text>
            <Text style={[textStyle.text5Light, { color: 'WHITE' }]}>
              {i18n.t(language.constant.days)}
            </Text>
            <Text style={[textStyle.text5, { color: 'WHITE' }]}>
              {hour}
              <Text style={[textStyle.text4Small, { color: 'WHITE' }]}>
                {' '}
                {i18n.t(language.constant.hr)}
              </Text>
            </Text>
          </View>
        );
      case 'count':
        return (
          <View>
            <Text style={[textStyle.text7, { color: 'WHITE' }]}>{day}</Text>
          </View>
        );
      case 'time-point':
        return (
          <View style={styles.cardContent}>
            <Text style={[textStyle.text5Light, { color: 'WHITE' }]}>
              {dayInWeek ? i18n.t(language.constant[dayInWeek]) : ''}
            </Text>
            <View style={styles.timeContainer}>
              <Text style={[textStyle.text7White, { color: 'WHITE' }]}>
                {day}
              </Text>
              <Text
                style={[
                  textStyle.text4Small,
                  styles.footerText,
                  { color: 'WHITE' },
                ]}
              >
                {ord}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <CardContainer label={label} labelValue={labelValue} position={position}>
      {getContent()}
    </CardContainer>
  );
};

export default Card;
