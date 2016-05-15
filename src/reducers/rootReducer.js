import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import routes from './routesReducers';
import auth from './authReducer';
// ... other reducers

export default combineReducers({
  auth,
  routes,
  wifis: handleActions({
    [ActionTypes.WIFI_LISTED]: (state = {loaded: false, list: []}, {payload}) => ({loaded: true, list: payload})},
    {loaded: false, list: []})
});