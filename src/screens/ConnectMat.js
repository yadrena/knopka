import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle} from '../styles/common';
import {Actions} from 'react-native-router-flux';
import WorkScreen from './WorkScreen';

class ConnectMat extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  render() {
    return (
      <WorkScreen>
        <Text style={commonStyle.text}>Networks...</Text>
        <Button onPress={Actions.home} {...buttonStyle}>Connect</Button>
      </WorkScreen>
    );
  }
}

export default connect(ConnectMat.mapStateToProps)(ConnectMat);