import React from 'react';
import {AppRegistry} from 'react-native';
import Reactotron from 'reactotron';
import App from './src/App';

const reactotronOpts = {
  name: 'Cesar Reactotron', // Display name of the client
  server: '192.168.0.104', // IP of the server to connect to
  port: 3334, // Port of the server to connect to (default: 3334)
  enabled: __DEV__ // Whether or not Reactotron should be enabled.
};

Reactotron.connect(reactotronOpts);

console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

AppRegistry.registerComponent('knopka', () => App);