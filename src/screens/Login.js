import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import {login} from '../actions/Actions';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

class Login extends Component {

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
          <TextInput placeholder="E-mail" keyboardType="email-address" value={this.state.email}
                     {...inputStyle}
                     onChangeText={(text) => this.setState({email: text})}/>
          <TextInput placeholder="Password" secureTextEntry={true} value={this.state.password}
                     {...inputStyle}
                     onChangeText={(text) => this.setState({password: text})}/>
          <Button onPress={this.onLogin} {...buttonStyle}>Log In</Button>
          <Button onPress={Actions.register} {...linkStyle}>Register</Button>
        </View>
        <Button onPress={Actions.login} {...linkStyle}>Restore password</Button>
      </View>
    );
  }

  onLogin = () => {
    this.props.login(this.state.email, this.state.password);
  }
}

export default connect(undefined, {login})(Login);