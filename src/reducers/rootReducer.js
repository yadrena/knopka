import {combineReducers} from 'redux';
import routes from './routesReducers';
import auth from './authReducer';
import settings from './settingsReducer';
import notifications from './notificationsReducer';
import wifis from './wifiReducer';


export default combineReducers({
  auth,
  routes,
  settings,
  notifications,
  wifis
});