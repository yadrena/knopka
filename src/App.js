import React, {Component} from 'react';
import {BackAndroid, Linking, AsyncStorage} from 'react-native';
import {persistStore} from 'redux-persist'
import {Router, Actions} from 'react-native-router-flux';
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';
import Reactotron from 'reactotron';
import {checkWifi, addNotification, hardwareBack, setLastInitialURL, gcmRegistered, wifiMatConnected} from './actions/Actions';
import PushNotification from 'react-native-push-notification';

import SplashScreen from '@remobile/react-native-splashscreen';
import routing from './routing';
import i18n from './i18n/i18n';

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {

  state = {
    rehydrated: false,
    initialRouting: {workScreens: false, home: false}
  };

  splashTimeout;
  splashHidden = false;

  componentDidMount() {
    Reactotron.log('App mounted');
    persistStore(store, {storage: AsyncStorage, blacklist: ['routes']}, () => {
      Reactotron.log('Reghydrated!');
      //TODO: should login to firebase with rehydrated token
      //Currently it logs in lazily, because it is only needed to store gcmToken
      //bacause firebase session length is set to 7 month
      const {auth, wifis} = store.getState();
      this.setState({
        rehydrated: true,
        initialRouting: {
          workScreens: auth.userData !== null,
          home: wifis.connected
        }
      });
      if (wifis.home === null)
        store.dispatch(checkWifi());
      this.attachListeners();
    });
  }

  attachListeners = () => {
    Reactotron.log('Attaching listeners!');
    PushNotification.configure({
      onRegister: function(token) {
        Reactotron.log('Notification receiver registered: ' + token.token);
        store.dispatch(gcmRegistered(token.token));
      },
      onNotification: this.onNotification,
      senderID: "304075958563",
      requestPermissions: true,
      popInitialNotification: false
    });
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);
    //adb shell am start -W -a android.intent.action.VIEW -d "cesar://recover/me@ya.ru/hjdjfshf" com.knopka
    //adb shell am start -W -a android.intent.action.VIEW -d "http://miss-u-mat.cesar.ru/recover/me@ya.ru/hjdjfshf" com.knopka
    Linking.getInitialURL()
      .then(url => {
        if (store.getState().lastInitialURL.url !== url) {
          const parts = url ? url.split('/') : [];
          console.log('Url parts:', parts);
          if (parts.length === 6 && parts[2] === 'miss-u-mat.cesar.ru' && parts[3] === 'recover') {
            console.log('Deep link to password change ', parts[4], parts[5]);
            store.dispatch(setLastInitialURL(url));
            Actions.changePassword({email: parts[4], oldPassword: parts[5]});
            this.hideSplashimmediately();
          }
        }
      })
      .catch(err => console.error('Deep linking error', err));

    this.splashTimeout = setTimeout( () => {
      SplashScreen.hide();
      this.splashHidden = true;
    }, 1000);
  };
  
  componentWillUnmount(){
    Reactotron.log('App unmounts');
    PushNotification.unregister();
    BackAndroid.removeEventListener('hardwareBackPress', this.handleAndroidBackButton);
  }

  render() {
    const {rehydrated, initialRouting: {workScreens, home}} = this.state;
    if(!rehydrated)
      return null;
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={routing(workScreens, home)}/>
      </Provider>
    );
  }
  
  onNotification = (notification) => {
    Reactotron.log('NOTIFICATION: ' + JSON.stringify(notification));
    if (!notification.data || !notification.data.event){
      console.warn('Notification must contain data and event code');
      return;
    }
    console.log('Notification:', notification.data.event, notification);
    switch (notification.data.event){
      case 1://Mat connected to home wi-fi network
        store.dispatch(wifiMatConnected());
        Actions.home();
        break;
      case 2://Message from pet
        if (store.getState().settings.receivePush)
          store.dispatch(addNotification(notification.data));
        break;
      case 3://TODO: Battery status - handle
        console.log('Battery status changed');
        break;
      default:
        console.warn('Unsupported push event');
    }
  };

  hideSplashimmediately = () => {
    if (!this.splashHidden){
      SplashScreen.hide();
      this.splashHidden = true;
      clearTimeout(this.splashTimeout);
    }
  };

  handleAndroidBackButton = () => {
    store.dispatch(hardwareBack());
    return true;
  }
}