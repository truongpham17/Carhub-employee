import { Platform } from 'react-native';

export const LOAD_LIMIT_COUNT = 20;
export const NOTIFICATION_CHANNEL = {
  channelId: 'channel',
  name: 'Channel',
  description: 'This is description',
};

export const ROLLCALL_TOPIC = 'rollcall';

export const RELAPSE_COUNT_DEFAULT = 0.1;
export const STREAK_COUNT_DEFAULT = 0;

export const TOKEN_EXPIRE_DAY = 3;

export const PLAT_FORM: 'android' | 'ios' = Platform.OS;

export const APP_POLICY_URL =
  'https://app.termly.io/document/privacy-policy/952b68e6-4f59-4cc1-a5b2-d299d6bc9f5e';
