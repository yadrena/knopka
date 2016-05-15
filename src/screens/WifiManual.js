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
        <Text style={[commonStyle.text, {marginBottom: 48}]}>
          {
            'Сверните приложение,\n' +
            'перейдите в настройки\n' +
            'и подключитесь к\n' +
            'Wi-Fi сети miss-U-mat\n\n' +
            'Если для подключения\n' +
            'потребуется пароль,\n' +
            'введите umat1234.\n\n' +
            'Вернитесь в приложение.'
          }
        </Text>
        <Button onPress={Actions.connectMat} {...buttonStyle}>Next</Button>
      </WorkScreen>
    );
  }
}

export default connect(WifiManual.mapStateToProps)(WifiManual);