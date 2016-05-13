import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {register} from '../actions/Actions';
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux';
import commonStyles from '../styles/common';

import {View, Text, StyleSheet, TextInput} from 'react-native';

class Register extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  state = {
    email: 'kaospostage+1@gmail.com',
    password: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput placeholder="E-mail" keyboardType="email-address" value={this.state.email}
                   style={commonStyles.input} placeholderTextColor="white" underlineColorAndroid="white"
                   onChangeText={(text) => this.setState({email: text})}/>
        <TextInput placeholder="Password" secureTextEntry={true} value={this.state.password}
                   style={commonStyles.input} placeholderTextColor="white" underlineColorAndroid="white"
                   onChangeText={(text) => this.setState({password: text})}/>
        <Button onPress={Actions.home} style={commonStyles.button}>Register</Button>
        <Button onPress={Actions.login} style={commonStyles.button}>I have login</Button>
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