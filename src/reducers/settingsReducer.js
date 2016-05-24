import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  avatar: null,
  nickname: null,
  receivePush: true,
  battery: {
    loading: false,
    charge: 100
  }
};

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case ActionTypes.SET_AVATAR:
      return {...state, avatar: payload};
    case ActionTypes.SET_NICKNAME:
      return {...state, nickname: payload};
    case ActionTypes.SET_RECEIVE_PUSH:
      return {...state, receivePush: payload};
    case ActionTypes.BATTERY_REQUEST:
      return {...state, battery: {...state.battery, loading: true}};
    case ActionTypes.BATTERY_RESPONSE:
      return {...state, battery: {loading: false, charge: payload}};
    default:
      return state;
  }
}