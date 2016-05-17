import {handleActions} from 'redux-actions';
import * as ActionTypes from '../actions/ActionTypes';
import _ from 'lodash';

export default handleActions({
    [ActionTypes.WIFI_REFRESH]: (state, {payload}) => ({loaded: false, list: [], error: ''}),
    [ActionTypes.WIFI_LISTED]: (state, {payload}) => ({loaded: true, list: _.uniqBy(payload, 'SSID'), error: ''}),
    [ActionTypes.WIFI_LIST_FAILED]: (state, {payload}) => ({loaded: false, list: [], error: payload})
  },
  {loaded: false, list: [], error: ''}
);