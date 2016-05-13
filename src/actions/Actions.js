import Firebase from 'firebase';
import {createAction} from 'redux-actions';
import * as ActionTypes from './ActionTypes';
import {Alert} from 'react-native';

const firebase = new Firebase('https://knopka.firebaseio.com');

const setLoadingStatus = createAction(ActionTypes.LOADING);
const userRegistered = createAction(ActionTypes.USER_REGISTERED);
const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN);

export function register(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return firebase.createUser({email, password})
      .then(userData => {
        dispatch(setLoadingStatus(false));
        //uid : "1ada9111-ea79-41fa-821c-c6b698e1de70"
        dispatch(userRegistered(userData));
      })
      .catch(error => {
        dispatch(setLoadingStatus(false));
        switch (error.code) {
          case "EMAIL_TAKEN":
            Alert.alert('Registration error', 'This e-mail is already taken, please choose different e-mail');
            break;
          case "INVALID_EMAIL":
            Alert.alert('Registration error', 'The specified e-mail is not a valid e-mail');
            break;
          default:
            Alert.alert('Registration error', 'Error while registering user: ' + error);
        }
      });
  }
}

export function login(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return firebase.authWithPassword({email, password})
      .then(userData => {
        dispatch(setLoadingStatus(false));
        //uid : "1ada9111-ea79-41fa-821c-c6b698e1de70"
        dispatch(userLoggedIn(userData));
      })
      .catch(error => {
        dispatch(setLoadingStatus(false));
        Alert.alert('Login failed', 'Login failed: ' + error);
      });
  }
}