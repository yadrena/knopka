import Firebase from 'firebase';
import {createAction} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from './ActionTypes';
import {Alert} from 'react-native';
import wifi from 'react-native-android-wifi';

const firebase = new Firebase('https://cesar-mat.firebaseio.com');

const setLoadingStatus = createAction(ActionTypes.LOADING);
const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN);
const wifiListed = createAction(ActionTypes.WIFI_LISTED);
const wifiListFailed = createAction(ActionTypes.WIFI_LIST_FAILED);
const gcmRegistered = createAction(ActionTypes.GCM_REGISTERED);
const setLastInitialURL = createAction(ActionTypes.SET_LAST_INITIAL_URL);
const setHomeWifi = createAction(ActionTypes.WIFI_HOME_SELECTED);

export const setAvatar = createAction(ActionTypes.SET_AVATAR);
export const setNickname = createAction(ActionTypes.SET_NICKNAME);
export const setReceivePush = createAction(ActionTypes.SET_RECEIVE_PUSH);
export const addNotification = createAction(ActionTypes.ADD_NOTIFICATION);
export const popNotification = createAction(ActionTypes.POP_NOTIFICATION);

export function register(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return firebase.createUser({email, password})
      .then( () =>
        dispatch(login(email, password, true))
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

export function login(email, password, thanks = false, recovery = false) {
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

export function requestRecover(email) {
  return (dispatch, getState) => {
    console.log('Requesting password recover', email);
    return firebase.resetPassword({email})
      .then(() => {
        console.log('Reset successful');
        Actions.recoverManual();
      })
      .catch(error => {
        switch (error.code) {
          case "INVALID_USER":
            Alert.alert('Password recovery failed', 'The specified user account does not exist');
            break;
          default:
            Alert.alert('Password recovery failed', error);
        }
      });
  }
}

export function changePassword(email, oldPassword, newPassword) {
  return (dispatch, getState) => {
    console.log('Requesting password change', email, oldPassword, newPassword);
    return dispatch(login(email, oldPassword, false, true))
      .then(() => firebase.changePassword({email, oldPassword, newPassword}))
      .then(() => Actions.passwordChanged())
      .catch(error => {
        switch (error.code) {
          case "INVALID_PASSWORD":
            Alert.alert('Failed to change password', 'The specified user account password is incorrect');
            break;
          case "INVALID_USER":
            Alert.alert('Failed to change password', 'The specified user account does not exist');
            break;
          default:
            Alert.alert('Failed to change password', error);
        }
      });
  };
}

export function checkWifi(){
  return (dispatch, getState) => {
    dispatch({type: ActionTypes.WIFI_REFRESH});
    wifi.isEnabled((isEnabled)=>{
      if (isEnabled){
        wifi.loadWifiList((wifiStringList) => {
            var wifiArray = JSON.parse(wifiStringList);
            dispatch(wifiListed(wifiArray));
          },
          (error) => {
            dispatch(wifiListFailed(I18n.t('wifiListFailedMessage')));
            console.log('Wifi lis error: ', error);
          }
        );
      } else {
        dispatch(wifiListFailed(I18n.t('wifiDisabledMessage')));
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
    dispatch(setHomeWifi(ssid));
    // const payload = {
    //   ssid, bssid, email, password, uid, gcmToken
    // };
    // console.log('Connect to', payload);
    const url = `http://192.168.45.1/index.php?pwd=O5FgdYdrcSgt3sl3ys8lc7LENYbo69&gcm_token=${gcmToken}&psk=${password}&ssid=${ssid}`;
    console.log('Fetching url', url);
    fetch(url)
      .then(response => console.log('Response!'))
      .catch();
    Actions.home();
  };
}

export function hardwareBack() {
  return (dispatch, getState) => {
    const scene = getState().routes.scene.sceneKey;
    //We cannot just pop all the time, because react-native-router-flux and react-native versions currently do not work well together
    if (scene === 'register' || scene === 'connectMat' || scene === 'settings'){
      Actions.pop();
    }
  }
}