import React, {PropTypes} from 'react';
import {Image} from 'react-native';

export default class CaesarLogo extends React.Component {
  static propTypes = {
    margin: PropTypes.number,
    big: PropTypes.bool
  };

  static defaultProps = {
    margin: 8,
    big: false
  };

  render() {
    const src = this.props.big ? require('../assets/logo_big.png') : require('../assets/logo.png');
    return (
      <Image source={src}  style={{margin: this.props.margin}}/>
    );
  }
}
