import React, {PropTypes} from 'react';
import {Image} from 'react-native';

export default class CaesarLogo extends React.Component {
  static propTypes = {
    margin: PropTypes.number
  };

  static defaultProps = {
    margin: 8
  };

  render() {
    return (
      <Image source={require('../assets/logo.png')}  style={{margin: this.props.margin}}/>
    );
  }
}
