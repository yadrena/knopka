import React, {PropTypes} from 'react'
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import moment from 'moment';
import i18n from '../i18n/i18n';
import Avatar from '../components/Avatar';

export default class NotificationCard extends React.Component {
  static propTypes = {
    depth: PropTypes.number,
    notification: PropTypes.object,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    onRemove: PropTypes.func,
    style: PropTypes.object
  };

  render() {
    const timestamp = this.props.notification.timestamp;
    const time = moment(timestamp).calendar(null, i18n.t('timeFormat'));
    return (
      <TouchableWithoutFeedback onLongPress={this.props.onRemove}>
        <View style={[styles.card, this.props.style]}>
          <Avatar avatar={this.props.avatar}/>
          <Text style={styles.nickname}>{this.props.nickname}</Text>
          <Text style={styles.message}>{this.props.notification.message}</Text>
          <Text style={styles.message}>{time}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderRadius: 5
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
