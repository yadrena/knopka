import React, {PropTypes} from 'react'
import {View, Text, TextInput} from 'react-native';
import Button from 'apsl-react-native-button';
import {Actions} from 'react-native-router-flux';
import CaesarLogo from '../components/CaesarLogo';
import {requestRecover} from '../actions/Actions';
import I18n from 'react-native-i18n';
import commonStyles, {linkStyle, buttonStyle, loginScreensStyle, inputStyle} from '../styles/common';
import {connect} from 'react-redux';

class RequestRecover extends React.Component {
  static propTypes = {
    requestRecover: PropTypes.func
  };

  state = {
    email: __DEV__ ? 'kaospostage+2@gmail.com' : ''
  };

  render() {
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={true}/>
          <View style={loginScreensStyle.middleContainer}>
          <Text style={commonStyles.header}>
            {I18n.t('recoverPassword')}
          </Text>
          <TextInput placeholder={I18n.t('email')} keyboardType="email-address" value={this.state.email}
            {...inputStyle}
                     onChangeText={(text) => this.setState({email: text})}/>
          <Button onPress={() => this.props.requestRecover(this.state.email)} {...buttonStyle}>{I18n.t('send')}</Button>
          <Button onPress={Actions.changePassword} {...linkStyle}>{I18n.t('changePasswordButton')}</Button>
        </View>
        <Button onPress={Actions.pop} {...linkStyle}>{I18n.t('loginButton')}</Button>
      </View>
    );
  }
}

export default connect(undefined, {requestRecover})(RequestRecover);