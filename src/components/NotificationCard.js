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
    style: PropTypes.object
  };

  render() {
    const timestamp = this.props.notification.timestamp;
    const time = moment.unix(timestamp).calendar(undefined, i18n.t('timeFormat'));
    console.log(timestamp, time, i18n.t('timeFormat'));
    return (
      <TouchableWithoutFeedback>
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

export const CARD_SIZE = {width: 250, height: 400};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderRadius: 5,
    width: CARD_SIZE.width,
    height: CARD_SIZE.height
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