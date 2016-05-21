import React, {PropTypes} from 'react'
import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import commonStyles from '../styles/common';

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.object,
    onPress: PropTypes.func
  };

  render() {
    const {avatar, onPress} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {avatar ? this.renderAvatar(avatar) : this.renderPlaceholder()}
      </TouchableWithoutFeedback>
    );
  }

  renderAvatar = (avatar) => {
    return (
      <Image source={avatar} style={commonStyles.avatar}/>
    );
  };

  renderPlaceholder = () => {
    return (
      <View style={[commonStyles.avatar, styles.placeholder]}>
        <Image source={require('../assets/camera.png')} style={{width: 50, height: 35}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c'
  }
});