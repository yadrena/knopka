import React, {PropTypes} from 'react'
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import moment from 'moment';
import i18n from '../i18n/i18n';
import Avatar from '../components/Avatar';
import Nickname from '../components/Nickname';

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
    // const message = i18n.t(`home.cards.${this.props.notification.code}`);
    const message = this.props.notification.message;
    return (
      <TouchableWithoutFeedback>
        <View style={[styles.card, this.props.style]}>
          <Avatar avatar={this.props.avatar}/>
          <Nickname nickname={this.props.nickname}/>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.timestamp}>{time}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export const CARD_SIZE = {width: 250, height: 400};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    borderRadius: 5,
    width: CARD_SIZE.width,
    height: CARD_SIZE.height
  },
  message: {
    flex: 1,
    color: 'black',
    fontSize: 24,
    textAlign: 'center'
  },
  timestamp: {
    color: '#5b5c5c',
    fontSize: 16,
    marginTop: 8
  }
});