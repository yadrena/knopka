import React, {Component} from 'react';
import {BackAndroid, Linking} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import Login from "./screens/Login";
import Register from "./screens/Register";
import SimpleScreen from "./screens/SimpleScreen";
import RequestRecover from "./screens/RequestRecover";
import ChangePassword from "./screens/ChangePassword";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import ConnectMat from "./screens/ConnectMat";
import {checkWifi, addNotification, hardwareBack, setLastInitialURL} from './actions/Actions';

import SplashScreen from '@remobile/react-native-splashscreen';
import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';
import i18n from './i18n/i18n';

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {

  splashTimeout;
  splashHidden = false;

  componentDidMount() {
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
      SplashScreen.hide(); this.splashHidden = true;
    }, 1000);
  }
  
  componentWillUnmount(){
    Notification.removeAllListeners('press');
    GCM.removeEventListener('notification', this.handleNotification);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" type="push">
            <Scene key="authScreens" hideNavBar={true}>
              <Scene key="login" component={Login} initial={true}/>
              <Scene key="register" component={Register} />
              <Scene key="thanks" component={SimpleScreen}
                     header={i18n.t('regThanks')} buttonText={i18n.t('regThanksLink')}
                     onButtonPress={() => Actions.workScreens()}/>
              <Scene key="reqRecover" component={RequestRecover} />
              <Scene key="recoverManual" component={SimpleScreen}
                     header={i18n.t('recoverManualHeader')}
                     message={i18n.t('recoverManualMessage')}
                     buttonText={i18n.t('next')}
                     onButtonPress={() => Actions.changePassword()}/>
              <Scene key="changePassword" component={ChangePassword} type="replace"/>
              <Scene key="passwordChanged" component={SimpleScreen}
                     header={i18n.t('passwordChangedHeader')}
                     buttonText={i18n.t('next')}
                     onButtonPress={() => Actions.workScreens()}/>
            </Scene>
            <Scene key="workScreens" hideNavBar={true} >
              <Scene key="wifiManual" component={SimpleScreen} initial={true}
                     message={i18n.t('wifiManual')}  buttonStyle="button"
                     buttonText={i18n.t('next')} bigLogo={false}
                     onButtonPress={() => Actions.connectMat()}/>
              <Scene key="connectMat" component={ConnectMat}/>
              <Scene key="home" component={Home}/>
              <Scene key="settings" component={Settings}/>
            </Scene>
          </Scene>
        </RouterWithRedux>
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
    var info = JSON.parse(notification.data.info);
    console.log('Received notification:', info, GCM.isInForeground);
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
    console.log('Notification press', e);
  };

  handleAndroidBackButton = () => {
    store.dispatch(hardwareBack());
    return true;
  }
}