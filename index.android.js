import React, {Component} from 'react';
import {AppRegistry,} from 'react-native';
import App from './src/App';

class knopka extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('knopka', () => knopka);
