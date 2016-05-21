import React, {Component} from 'react';
import {BackAndroid, Linking} from 'react-native';
import {Router} from 'react-native-router-flux';
import {Provider, connect} from 'react-redux';
import configureStore from './store/configureStore';
import Reactotron from 'reactotron';
import {checkWifi, addNotification, hardwareBack, setLastInitialURL} from './actions/Actions';

import SplashScreen from '@remobile/react-native-splashscreen';
import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';
import routing from './routing';
import i18n from './i18n/i18n';

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {

  splashTimeout;
  splashHidden = false;

  componentDidMount() {
    Reactotron.log('App mounted ' + GCM.launchNotification);
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);

    store.dispatch(checkWifi());

    GCM.addEventListener('notification', this.handleNotification);
    Notification.addListener('press', this.handleNotificationPress);
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
  }
  
  componentWillUnmount(){
    Reactotron.log('App unmounts');
    Notification.removeAllListeners('press');
    GCM.removeEventListener('notification', this.handleNotification);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={routing}/>
      </Provider>
    );
  }

  hideSplashimmediately = () => {
    if (!this.splashHidden){
      SplashScreen.hide();
      this.splashHidden = true;
      clearTimeout(this.splashTimeout);
    }
  };

  handleNotification = (notification) => {
    this.hideSplashimmediately();
    Reactotron.log('Received notification in ' + (GCM.isInForeground ? 'foreground: ' : 'background: ') + notification.data.info);
    var info = JSON.parse(notification.data.info);
    store.dispatch(addNotification(info));
    if (!GCM.isInForeground) {
      Notification.create({
        subject: info.subject,
        message: info.message
      });
    }
  };

  handleNotificationPress = (e) => {
    //{action: 'DEFAULT', payload: {}}
    Notification.clearAll();
    Reactotron.log('Notification press: ' + JSON.stringify(e));
  };

  handleAndroidBackButton = () => {
    store.dispatch(hardwareBack());
    return true;
  }
}