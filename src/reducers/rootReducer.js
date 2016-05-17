import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import routes from './routesReducers';
import auth from './authReducer';
import settings from './settingsReducer';
import notifications from './notificationsReducer';
// ... other reducers

export default combineReducers({
  auth,
  routes,
  settings,
  notifications,
  wifis: handleActions({
    [ActionTypes.WIFI_REFRESH]: (state, {payload}) => ({loaded: false, list: [], error: ''}),
    [ActionTypes.WIFI_LISTED]: (state, {payload}) => ({loaded: true, list: payload, error: ''}),
    [ActionTypes.WIFI_LIST_FAILED]: (state, {payload}) => ({loaded: false, list: [], error: payload}) },
    {loaded: false, list: [], error: ''}
  )
});