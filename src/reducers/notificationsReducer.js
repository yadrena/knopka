import * as ActionTypes from '../actions/ActionTypes';

const initialState = [];

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return [...state, payload];
    case ActionTypes.POP_NOTIFICATION:
      return state.slice(0, -1);
    default:
      return state;
  }
}