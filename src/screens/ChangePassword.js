import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import {changePassword} from '../actions/Actions';
import {View, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import I18n from 'react-native-i18n';
import {buttonStyle, linkStyle, loginScreensStyle, inputStyle} from '../styles/common';

class ChangePassword extends React.Component {
  static propTypes = {
    changePassword: PropTypes.func,
    email: PropTypes.string,
    oldPassword: PropTypes.string
  };

  static defaultProps = {
    email: '',
    oldPassword: ''
  };

  constructor(props){
    super(props);
    const email = this.props.email ? this.props.email : (__DEV__ ? 'kaospostage+2@gmail.com' : '');
    const oldPassword = this.props.oldPassword ? this.props.oldPassword : (__DEV__ ? 'asdfgh' : '');
    this.state = {
      email,
      oldPassword,
      newPassword: __DEV__ ? 'qwerty' : ''
    }
  }

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
        <Button onPress={Actions.login} {...linkStyle}>{I18n.t('loginButton')}</Button>
      </View>
    );
  }
}

export default connect(undefined, {changePassword})(ChangePassword);