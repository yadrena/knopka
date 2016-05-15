import React, {PropTypes} from 'react'
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import commonStyles from '../styles/common';

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <Image source={this.props.avatar || require('../assets/dog.jpg')} style={commonStyles.avatar}/>
      </TouchableWithoutFeedback>
    );
  }
}
