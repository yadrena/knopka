import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button'
import {login} from '../actions/Actions';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import commonStyles from '../styles/common';

class Login extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  state = {
    email: 'kaospostage+1@gmail.com',
    password: 'qwerty'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput placeholder="E-mail" keyboardType="email-address" value={this.state.email}
                   style={commonStyles.input} placeholderTextColor="white" underlineColorAndroid="white"
                   onChangeText={(text) => this.setState({email: text})}/>
        <TextInput placeholder="Password" secureTextEntry={true} value={this.state.password}
                   style={commonStyles.input} placeholderTextColor="white" underlineColorAndroid="white"
                   onChangeText={(text) => this.setState({password: text})}/>
        <Button onPress={Actions.home} style={commonStyles.button}>Log In</Button>
        <Button onPress={Actions.register} style={commonStyles.button}>Register</Button>
      </View>
    );
  }

  onLogin = () => {
    this.props.login(this.state.email, this.state.password);
  }
}

export default connect(undefined, {login})(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black'
  }
});