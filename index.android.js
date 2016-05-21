import React from 'react';
import {AppRegistry} from 'react-native';
import Reactotron from 'reactotron';

import GCM from 'react-native-gcm-push-notification';
import Notification from 'react-native-system-notification';

  const reactotronOpts = {
    name: 'Cesar Reactotron', // Display name of the client
    server: '192.168.0.104', // IP of the server to connect to
    port: 3334, // Port of the server to connect to (default: 3334)
    enabled: __DEV__ // Whether or not Reactotron should be enabled.
  };

  Reactotron.connect(reactotronOpts);

if (GCM.launchNotification) {
  var notification = GCM.launchNotification;
  Reactotron.log('Before entering function:', notification);
  var info = JSON.parse(notification.info);
  Notification.create(info);
  GCM.stopService();
}
else {
  const knopka = require('./src/App').default;
  AppRegistry.registerComponent('knopka', () => knopka);
}
