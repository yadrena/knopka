import * as ActionTypes from '../actions/ActionTypes';
import _ from 'lodash';

// const initialState = [{message: 'First'}, {message: 'Second'}, {message: 'Third'}];
const initialState = [];

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return _.uniqBy([...state, payload], 'timestamp');
    case ActionTypes.POP_NOTIFICATION:
      return state.slice(0, -1);
    case ActionTypes.SWIPE_NOTIFICATION:
      return state.slice(-1, 3).concat(state.slice(0, -1));
    default:
      return state;
  }
}