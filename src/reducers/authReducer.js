import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  userData: null
};

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
      return {...state, userData: payload};
    case ActionTypes.USER_REGISTERED:
      return {...state, userData: payload};
    default:
      return state;
  }
}