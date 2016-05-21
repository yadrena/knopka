import {combineReducers} from 'redux';
import routes from './routesReducers';
import auth from './authReducer';
import settings from './settingsReducer';
import notifications from './notificationsReducer';
import wifis from './wifiReducer';
import * as ActionTypes from '../actions/ActionTypes'; 

export default combineReducers({
  auth,
  routes,
  settings,
  notifications,
  wifis,
  lastInitialURL
});

function lastInitialURL(state = '', action){
  switch (action.type){
    case ActionTypes.SET_LAST_INITIAL_URL:
      return action.payload;
    default:
      return state;
  }
}