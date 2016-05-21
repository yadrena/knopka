import {handleActions} from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import _ from 'lodash';

export default handleActions({
    [ActionTypes.WIFI_REFRESH]: (state, {payload}) => ({loaded: false, list: [], error: '', home: null}),
    [ActionTypes.WIFI_LISTED]: (state, {payload}) => ({loaded: true, list: _.uniqBy(payload, 'SSID'), error: '', home: null}),
    [ActionTypes.WIFI_LIST_FAILED]: (state, {payload}) => ({loaded: false, list: [], error: payload, home: null}),
    [ActionTypes.WIFI_HOME_SELECTED]: (state, {payload}) => ({...state, home: payload})
  },
  {loaded: false, list: [], error: '', home: null}
);