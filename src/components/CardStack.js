import React, {PropTypes} from 'react'
import {View, StyleSheet} from 'react-native';
import NotificationCard from './NotificationCard';
import _ from 'lodash';

export default class CardStack extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    onRemove: PropTypes.func
  };

  render() {
    const {notifications, avatar, nickname, onRemove} = this.props;
    const lastThree = _.takeRight(notifications, 3);
    const content = [];
    for (let i = 0; i < lastThree.length; i++) {
      let note = lastThree[i];
      let d = lastThree.length - 1 - i;
      content.push(
        <NotificationCard key={'note'+i} depth={d} notification={note}
                          avatar={avatar} nickname={nickname}
                          onRemove={onRemove}/>
      );
    }

    return (
      <View style={styles.stack}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stack: {
    width: 250,
    height: 450
  }
});
