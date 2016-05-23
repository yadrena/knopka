import Firebase from 'firebase';
import {createAction} from 'redux-actions';
import {Actions} from 'react-native-router-flux';
import * as ActionTypes from './ActionTypes';
import {Alert, NetInfo} from 'react-native';
import wifi from 'react-native-android-wifi';
import I18n from '../i18n/i18n';

const firebase = new Firebase('https://cesar-mat.firebaseio.com');

const setLoadingStatus = createAction(ActionTypes.LOADING);
const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN);
const wifiListed = createAction(ActionTypes.WIFI_LISTED);
const wifiListFailed = createAction(ActionTypes.WIFI_LIST_FAILED);
const setHomeWifi = createAction(ActionTypes.WIFI_HOME_SELECTED);

export const setLastInitialURL = createAction(ActionTypes.SET_LAST_INITIAL_URL);
export const setAvatar = createAction(ActionTypes.SET_AVATAR);
export const setNickname = createAction(ActionTypes.SET_NICKNAME);
export const setReceivePush = createAction(ActionTypes.SET_RECEIVE_PUSH);
export const addNotification = createAction(ActionTypes.ADD_NOTIFICATION);
export const popNotification = createAction(ActionTypes.POP_NOTIFICATION);
export const wifiMatConnected = createAction(ActionTypes.WIFI_MAT_CONNECTED);

export function register(email, password) {
  return (dispatch, create) => {
    dispatch(setLoadingStatus(true));
    return checkNetAvailability()
      .then(() => firebase.createUser({email, password}))
      .then(() =>
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
          case 'NOT_CONNECTED':
            Alert.alert(I18n.t('errors.network'), I18n.t('errors.wifi.disabled'));
            break;
          default:
            Alert.alert('Registration error', 'Error while registering user: ' + error);
        }
      });
  }
}

export function login(email, password, thanks = false, recovery = false) {
  return (dispatch, getState) => {
    dispatch(setLoadingStatus(true));
    return checkNetAvailability()
      .then(() => firebase.authWithPassword({email, password}))
      .then(userData => {
        dispatch(setLoadingStatus(false));
        dispatch(userLoggedIn(userData));
        if (thanks)
          Actions.thanks();
        else if (!recovery)
          Actions.workScreens();
        dispatch(updateFirebase());
      })
      .catch(error => {
        dispatch(setLoadingStatus(false));
        console.log('Login error', error);
        if (error) {
          switch (error.code){
            case 'NOT_CONNECTED':
              Alert.alert(I18n.t('errors.network'), I18n.t('errors.wifi.disabled'));
              break;
            default:
              Alert.alert('Login failed', 'Login failed: ' + error);
          }
        }
      });
  }
}

function updateFirebase() {
  return (dispatch, getState) => {
    let authenticated = firebase.getAuth() !== null;
    let auth = getState().auth;
    if (!auth.userData) {
      console.warn('Wants to save in firebase, but not authenticated in app');
      return;
    }
    console.log('Updating firebase', authenticated, auth);
    const uid = auth.userData.uid;
    const data = {email: auth.userData.password.email, gcmToken: auth.gcmToken};
    checkNetAvailability()
      .then(() => {
        if (!authenticated) {
          const rehydratedFirbaseToken = auth.userData.token;
          firebase.authWithCustomToken(rehydratedFirbaseToken)
            .then(() => firebase.child("users").child(uid).update(data))
            .catch(error => console.warn('Firebase rehydration failed: ' + error));
        }
        else {
          firebase.child("users").child(uid).update(data);
        }
      });
  }
}

export function requestRecover(email) {
  return (dispatch, getState) => {
    console.log('Requesting password recover', email);
    return checkNetAvailability()
      .then(() => firebase.resetPassword({email}))
      .then(() => {
        console.log('Reset successful');
        Actions.recoverManual();
      })
      .catch(error => {
        switch (error.code) {
          case "INVALID_USER":
            Alert.alert('Password recovery failed', 'The specified user account does not exist');
            break;
          case 'NOT_CONNECTED':
            Alert.alert(I18n.t('errors.network'), I18n.t('errors.wifi.disabled'));
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
    return checkNetAvailability()
      .then(() => dispatch(login(email, oldPassword, false, true)))
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
          case 'NOT_CONNECTED':
            Alert.alert(I18n.t('errors.network'), I18n.t('errors.wifi.disabled'));
            break;
          default:
            Alert.alert('Failed to change password', error);
        }
      });
  };
}

export function gcmRegistered(gcmToken) {
  return (dispatch, getState) => {
    dispatch(createAction(ActionTypes.GCM_REGISTERED)(gcmToken));
    dispatch(updateFirebase());
  }
}

export function checkWifi() {
  return (dispatch, getState) => {
    dispatch({type: ActionTypes.WIFI_REFRESH});
    checkNetAvailability()
      .then(() => wifi.isEnabled((isEnabled) => {
        if (isEnabled) {
          wifi.loadWifiList((wifiStringList) => {
              var wifiArray = JSON.parse(wifiStringList);
              dispatch(wifiListed(wifiArray));
            },
            (error) => {
              dispatch(wifiListFailed(I18n.t('errors.wifi.listFailed')));
              console.log('Wifi lis error: ', error);
            }
          );
        } else {
          dispatch(wifiListFailed(I18n.t('errors.wifi.disabled')));
          console.log("wifi service is disabled");
        }
      })
    )
    .catch(error => {
        dispatch(wifiListFailed(I18n.t('errors.wifi.disabled')));
    });
  }
}

export function connectToMat({ssid, bssid}, password) {
  return (dispatch, getState) => {
    const {userData, gcmToken} = getState().auth;
    if (!userData) {
      Alert.alert('Connection error', 'User must be logged in to connect to mat');
      return;
    }
    else if (!gcmToken) {
      Alert.alert('Connection error', 'Cannot find GCM token');
      return;
    }
    const {password: {email}, uid} = userData;
    dispatch(setHomeWifi(ssid));
    // const payload = {
    //   ssid, bssid, email, password, uid, gcmToken
    // };
    // console.log('Connect to', payload);
    const timeout = new Promise((resolve, reject) => setTimeout(reject, 30000));
    const url = `http://192.168.45.1/index.php?pwd=O5FgdYdrcSgt3sl3ys8lc7LENYbo69&gcm_token=${gcmToken}&psk=${password}&ssid=${ssid}&locale=${I18n.locale}&uid=${uid}`;
    console.log('Fetching url', url);
    //For now, we just show 'connecting' screen and wait for push notification
    Promise.race([fetch(url), timeout])
      .then(() => {
        console.log('Mat successfully connected!');
        //Actions.home();
      })
      .catch(error => {
        console.log('Failed to connect to mat');
        //Actions.connectionFailed();
        //Actions.home();
      });
    Actions.connectingMat();
  };
}

export function hardwareBack() {
  return (dispatch, getState) => {
    const scene = getState().routes.scene.sceneKey;
    //We cannot just pop all the time, because react-native-router-flux and react-native versions currently do not work well together
    if (scene === 'register' || scene === 'connectMat' || scene === 'settings') {
      Actions.pop();
    }
  }
}

function checkNetAvailability() {
  return NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      return true;
    }
    else {
      //Alert.alert(I18n.t('errors.network'), I18n.t('errors.wifi.disabled'));
      return Promise.reject({code: 'NOT_CONNECTED'});
    }
  });
  // return Promise.reject({code: 'NOT_CONNECTED'});
}