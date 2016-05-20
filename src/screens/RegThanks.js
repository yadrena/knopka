import React, {PropTypes} from 'react'
import {View, Text} from 'react-native';
import Button from 'apsl-react-native-button';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import I18n from 'react-native-i18n';
import commonStyles, {linkStyle, loginScreensStyle} from '../styles/common';

export default class RegThanks extends React.Component {
  render() {
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={true}/>
        <Text style={commonStyles.header}>
          {I18n.t('regThanks')}
        </Text>
        <Button onPress={Actions.workScreens} {...linkStyle}>{I18n.t('regThanksLink')}</Button>
      </View>
    );
  }
}