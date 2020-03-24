import { combineReducers } from 'redux';
import user from './user';
import rental from './rental';
import lease from './lease';
import qrCode from './qrCode';
import statistic from './statistic';

export default combineReducers({
  user,
  rental,
  lease,
  qrCode,
  statistic,
});
