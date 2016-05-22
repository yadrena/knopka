import {handleActions} from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import _ from 'lodash';

export default handleActions({
    [ActionTypes.WIFI_REFRESH]: (state, {payload}) => ({loaded: false, list: [], error: '', home: null, connected: false}),
    [ActionTypes.WIFI_LISTED]: (state, {payload}) => ({loaded: true, list: _.uniqBy(payload, 'SSID'), error: '', home: null, connected: false}),
    [ActionTypes.WIFI_LIST_FAILED]: (state, {payload}) => ({loaded: false, list: [], error: payload, home: null, connected: false}),
    [ActionTypes.WIFI_HOME_SELECTED]: (state, {payload}) => ({...state, home: payload, connected: false}),
    [ActionTypes.WIFI_MAT_CONNECTED]: (state, {payload}) => ({...state, connected: true})
  },
  {loaded: false, list: [], error: '', home: null, connected: false}
);