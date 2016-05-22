import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/Actions';
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

import {View, TextInput} from 'react-native';
import I18n from 'react-native-i18n';

class Register extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  //__DEV__ does not work with HMR and __DEV__ = false, at least in react native 0.25
  state = {
    email: __DEV__ ? 'me@ya.ru' : '',
    password: __DEV__ ? 'qwerty' : ''
  };

  render() {
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={true}/>
        <View style={loginScreensStyle.middleContainer}>
          <TextInput placeholder={I18n.t('commons.email')} keyboardType="email-address" value={this.state.email}
            {...inputStyle}
                     onChangeText={(text) => this.setState({email: text})}/>
          <TextInput placeholder={I18n.t('commons.password')} secureTextEntry={true} value={this.state.password}
            {...inputStyle}
                     onChangeText={(text) => this.setState({password: text})}/>
          <Button onPress={this.onRegister} {...buttonStyle}>{I18n.t('register.button')}</Button>
        </View>
        <Button onPress={Actions.pop} {...linkStyle}>{I18n.t('register.login')}</Button>
      </View>
    );
  }

  onRegister = () => {
    this.props.register(this.state.email, this.state.password);
  }
}

export default connect(undefined, {register})(Register);