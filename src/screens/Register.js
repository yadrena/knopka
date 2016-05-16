import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/Actions';
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

import {View, Text, StyleSheet, TextInput} from 'react-native';
import I18n from 'react-native-i18n';

class Register extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  state = {
    email: 'kaospostage+2@gmail.com',
    password: 'qwerty'
  };

  render() {
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo/>
        <View style={loginScreensStyle.middleContainer}>
          <TextInput placeholder={I18n.t('email')} keyboardType="email-address" value={this.state.email}
            {...inputStyle}
                     onChangeText={(text) => this.setState({email: text})}/>
          <TextInput placeholder={I18n.t('password')} secureTextEntry={true} value={this.state.password}
            {...inputStyle}
                     onChangeText={(text) => this.setState({password: text})}/>
          <Button onPress={this.onRegister} {...buttonStyle}>{I18n.t('registerButton')}</Button>
        </View>
        <Button onPress={Actions.pop} {...linkStyle}>{I18n.t('alreadyRegistered')}</Button>
      </View>
    );
  }

  onRegister = () => {
    this.props.register(this.state.email, this.state.password);
  }
}

export default connect(undefined, {register})(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});