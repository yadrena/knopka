import React, {Component} from 'react';
import {AppRegistry,} from 'react-native';
import App from './src/App';
import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';

class knopka extends Component {
  render() {
    return (
      <App/>
    );
  }
}

if (GCM.launchNotification) {
  console.log('WTF???');
  var notification = GCM.launchNotification;
  var info = JSON.parse(notification.info);
  Notification.create({
    subject: info.subject,
    message: info.message
  });
  Notification.create({
    subject: info.subject,
    message: info.message
  });
  GCM.stopService();
}
else {
  AppRegistry.registerComponent('knopka', () => knopka);
}
