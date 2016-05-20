import React, {Component} from 'react';
import {BackAndroid} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import Login from "./screens/Login";
import Register from "./screens/Register";
import RegThanks from "./screens/RegThanks";
import RequestRecover from "./screens/RequestRecover";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import WifiManual from "./screens/WifiManual";
import ConnectMat from "./screens/ConnectMat";
import {checkWifi, addNotification, hardwareBack} from './actions/Actions';

import SplashScreen from '@remobile/react-native-splashscreen';
import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';
import i18n from './i18n/i18n';

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleAndroidBackButton);

    store.dispatch(checkWifi());
    setTimeout( () => SplashScreen.hide(), 1000);
    
    GCM.addEventListener('notification', this.handleNotification);
    Notification.addListener('press', this.handleNotificationPress);
  }
  
  componentWillUnmount(){
    Notification.removeAllListeners('press');
    GCM.removeEventListener('notification', this.handleNotification);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" type="jump">
            <Scene key="authScreens" hideNavBar={true}>
              <Scene key="login" component={Login} initial={true}/>
              <Scene key="register" component={Register} type="push"/>
              <Scene key="thanks" component={RegThanks} type="push"/>
              <Scene key="reqRecover" component={RequestRecover} type="push"/>
            </Scene>
            <Scene key="workScreens" hideNavBar={true} type="push" >
              <Scene key="wifiManual" component={WifiManual} initial={true}/>
              <Scene key="connectMat" component={ConnectMat}/>
              <Scene key="home" component={Home}/>
              <Scene key="settings" component={Settings}/>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }

  handleNotification = (notification) => {
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