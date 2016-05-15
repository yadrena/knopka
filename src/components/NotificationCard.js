import React, {PropTypes} from 'react'
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Avatar from '../components/Avatar';

export default class NotificationCard extends React.Component {
  static propTypes = {
    depth: PropTypes.number,
    notification: PropTypes.object,
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    onRemove: PropTypes.func
  };

  render() {
    return (
      this.props.depth == 0 ? this.renderTop() : this.renderBlank()
    );
  }

  renderTop = () => {
    return (
      <TouchableWithoutFeedback onLongPress={this.props.onRemove}>
        <View style={[styles.card, this.getOwnStyle()]}>
          <Avatar avatar={this.props.avatar}/>
          <Text style={styles.nickname}>{this.props.nickname}</Text>
          <Text style={styles.message}>{this.props.notification.message}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderBlank = () => {
    return <View style={[styles.card, this.getOwnStyle()]}/>
  };

  getOwnStyle = () => {
    const depth = this.props.depth;
    return {
      top: (3 - depth) * STEP,
      left: depth * STEP,
      right: depth * STEP,
      bottom: depth * STEP,
      backgroundColor: CARD_COLORS[depth]
    };
  }
}

const STEP = 8;
const CARD_COLORS = ['#d8d8d8', '#cccccc', '#a8a8a8'];

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderRadius: 2
  },
  nickname: {
    color: 'black',
    fontSize: 24
  },
  message: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
});
