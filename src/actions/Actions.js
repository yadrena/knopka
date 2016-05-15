import Firebase from 'firebase';
import {createAction} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from './ActionTypes';
import {Alert} from 'react-native';
import wifi from 'react-native-android-wifi';

const firebase = new Firebase('https://knopka.firebaseio.com');

const setLoadingStatus = createAction(ActionTypes.LOADING);
const userRegistered = createAction(ActionTypes.USER_REGISTERED);
const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN);
const wifiListed = createAction(ActionTypes.WIFI_LISTED);

export function register(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return firebase.createUser({email, password})
      .then(userData => {
        dispatch(setLoadingStatus(false));
        //uid : "1ada9111-ea79-41fa-821c-c6b698e1de70"
        dispatch(userRegistered(userData));
        Actions.workScreens();
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
        Actions.workScreens();
      })
      .catch(error => {
        dispatch(setLoadingStatus(false));
        Alert.alert('Login failed', 'Login failed: ' + error);
      });
  }
}

export function checkWifi(){
  return (dispatch, getState) => {
    wifi.isEnabled((isEnabled)=>{
      if (isEnabled){
        wifi.loadWifiList((wifiStringList) => {
            var wifiArray = JSON.parse(wifiStringList);
            dispatch(wifiListed(wifiArray));
          },
          (error) => {
            console.log(error);
          }
        );
      }else{
        console.log("wifi service is disabled");
      }
    });
  }
}