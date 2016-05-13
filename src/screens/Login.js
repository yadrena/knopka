import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-native-material-design';
import {login} from '../actions/Actions';
import {View, Text, StyleSheet, TextInput} from 'react-native';

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
                   onChangeText={(text) => this.setState({email: text})}/>
        <TextInput placeholder="Password" secureTextEntry={true} value={this.state.password}
                   onChangeText={(text) => this.setState({password: text})}/>
        <Button value="Log In" onPress={this.onRegister}/>
      </View>
    );
  }

  onRegister = () => {
    this.props.login(this.state.email, this.state.password);
  }
}

export default connect(undefined, {login})(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});