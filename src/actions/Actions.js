import Firebase from 'firebase';
import {createAction} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from './ActionTypes';
import {Alert} from 'react-native';
import wifi from 'react-native-android-wifi';
import GCM from 'react-native-gcm-push-notification';

const firebase = new Firebase('https://knopka.firebaseio.com');

const setLoadingStatus = createAction(ActionTypes.LOADING);
const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN);
const wifiListed = createAction(ActionTypes.WIFI_LISTED);
const gcmRegistered = createAction(ActionTypes.GCM_REGISTERED);

export function register(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return firebase.createUser({email, password})
      .then( () =>
        dispatch(login(email, password))
      )
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
        GCM.addEventListener('register', function(data){
          if(!data.error){
            dispatch(gcmRegistered(data.registrationToken));
          }
          else {
            Alert.alert('GCM Error', 'Failed to register token: ' + data.error);
            console.log('GCM error:', data.error);
          }
          Actions.workScreens();
        });
        GCM.requestPermissions();
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

export function connectToMat({ssid, bssid}, password ){
  return (dispatch, getState) => {
    const {userData, gcmToken} = getState().auth;
    if (!userData) {
      Alert.alert('Connection error', 'User must be logged in to connect to mat');
      return;
    }
    else if (!gcmToken){
      Alert.alert('Connection error', 'Cannot find GCM token');
      return;
    }
    const {password: {email}, uid} = userData;
    const payload = {
      ssid, bssid, email, password, uid, gcmToken
    };
    console.log('Connect to', payload);
    //fetch here
  };
}