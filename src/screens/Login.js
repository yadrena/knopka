import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import {login} from '../actions/Actions';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import I18n from 'react-native-i18n';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

class Login extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  state = {
    email: __DEV__ ? 'kaospostage+2@gmail.com' : '',
    password: __DEV__ ? 'qwerty' : ''
  };

  render() {
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={true}/>
        <View style={loginScreensStyle.middleContainer}>
          <TextInput placeholder={I18n.t('email')} keyboardType="email-address" value={this.state.email}
                     {...inputStyle}
                     onChangeText={(text) => this.setState({email: text})}/>
          <TextInput placeholder={I18n.t('password')} secureTextEntry={true} value={this.state.password}
                     {...inputStyle}
                     onChangeText={(text) => this.setState({password: text})}/>
          <View style={{height: 8}}/>
          <Button onPress={this.onLogin} {...buttonStyle}>{I18n.t('loginButton')}</Button>
          <Button onPress={Actions.reqRecover} {...linkStyle}>{I18n.t('restorePassword')}</Button>
        </View>
        <Button onPress={Actions.register} {...linkStyle}>{I18n.t('registerButton')}</Button>
      </View>
    );
  }

  onLogin = () => {
    this.props.login(this.state.email, this.state.password);
  }
}

export default connect(undefined, {login})(Login);