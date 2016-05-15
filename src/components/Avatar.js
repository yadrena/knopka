import React, {PropTypes} from 'react'
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import commonStyles from '../styles/common';

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    const content = this.props.avatar ?
      <Image source={this.props.avatar} style={commonStyles.avatar}/> :
      <View style={[commonStyles.avatar, {backgroundColor: 'red'}]}/>;
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        {content}
      </TouchableWithoutFeedback>
    );
  }
}
