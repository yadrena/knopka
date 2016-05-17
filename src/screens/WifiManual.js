import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle} from '../styles/common';
import {Actions} from 'react-native-router-flux';
import WorkScreen from './WorkScreen';
import I18n from 'react-native-i18n';

class WifiManual extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  render() {
    return (
      <WorkScreen lefty={null}>
        <Text style={[commonStyle.text, {marginBottom: 48}]}>
          {I18n.t('wifiManual')}
        </Text>
        <Button onPress={Actions.connectMat} {...buttonStyle}>{I18n.t('next')}</Button>
      </WorkScreen>
    );
  }
}

export default connect(WifiManual.mapStateToProps)(WifiManual);