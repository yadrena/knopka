import React from 'react';
import {AppRegistry} from 'react-native';

import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';

if (GCM.launchNotification) {
  var notification = GCM.launchNotification;
  console.log('Before entering function:', notification);
  var info = JSON.parse(notification.info);
  Notification.create({
    subject: info.subject,
    message: info.message
  });
  //GCM.stopService();
}
else {
  const knopka = require('./src/App').default;
  AppRegistry.registerComponent('knopka', () => knopka);
}
