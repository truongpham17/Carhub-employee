import { combineReducers } from 'redux';
import user from './user';
import rental from './rental';
import lease from './lease';
import qrCode from './qrCode';

export default combineReducers({
  user,
  rental,
  lease,
  qrCode,
});
