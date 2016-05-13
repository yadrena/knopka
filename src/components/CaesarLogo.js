import React from 'react';
import {Image} from 'react-native';

export default class CaesarLogo extends React.Component {
  static propTypes = {};

  render() {
    return (
      <Image source={{uri: 'logo'}} style={{width: 99, height: 58}} />
    );
  }
}
