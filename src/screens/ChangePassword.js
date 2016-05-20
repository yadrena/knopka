import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import {changePassword} from '../actions/Actions';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import I18n from 'react-native-i18n';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

class ChangePassword extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func
  };

  state = {
    email: __DEV__ ? 'kaospostage+2@gmail.com' : '',
    oldPassword: __DEV__ ? 'qwerty' : '',
    newPassword: __DEV__ ? 'asdfgh' : ''
  };

  render() {
    const {changePassword} = this.props;
    const {email, oldPassword, newPassword} = this.state;
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={true}/>
        <View style={loginScreensStyle.middleContainer}>
          <TextInput placeholder={I18n.t('email')} keyboardType="email-address" value={email}
                     {...inputStyle} onChangeText={(text) => this.setState({email: text})}/>
          <TextInput placeholder={I18n.t('oldPassword')} value={oldPassword}
                     {...inputStyle} onChangeText={(text) => this.setState({oldPassword: text})}/>
          <TextInput placeholder={I18n.t('newPassword')} secureTextEntry={true} value={newPassword}
                     {...inputStyle} onChangeText={(text) => this.setState({newPassword: text})}/>
          <View style={{height: 8}}/>
          <Button onPress={() => changePassword(email, oldPassword, newPassword)} {...buttonStyle}>{I18n.t('changePasswordButton')}</Button>
        </View>
        <Button onPress={Actions.pop} {...linkStyle}>{I18n.t('loginButton')}</Button>
      </View>
    );
  }
}

export default connect(undefined, {changePassword})(ChangePassword);