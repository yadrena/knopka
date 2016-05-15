import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle} from '../styles/common';
import {Actions} from 'react-native-router-flux';
import WorkScreen from './WorkScreen';

class WifiManual extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  render() {
    return (
      <WorkScreen>
        <Text style={commonStyle.text}>Wifi manual</Text>
        <Button onPress={Actions.connectMat} {...buttonStyle}>Next</Button>
      </WorkScreen>
    );
  }
}

export default connect(WifiManual.mapStateToProps)(WifiManual);