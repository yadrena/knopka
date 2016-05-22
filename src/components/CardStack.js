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
      const cardStyle = {backgroundColor: CARD_COLORS[d]};
      content.push(
        <View style={this.getCardStyle(d)} key={'card'+note.timestamp} >
          <NotificationCard depth={d} notification={note}
                            avatar={avatar} nickname={nickname}
                            onRemove={onRemove} style={cardStyle}/>
        </View>
      );
    }

    return (
      <View style={styles.stack}>
        {content}
      </View>
    );
  }

  getCardStyle = (depth) => {
    const stackPos = 3 - depth;
    const scale = 1 - 0.1 * depth;
    return {
      position: 'absolute',
      elevation: 1 + stackPos,
      transform: [
        {scale},
        {translateX: 70 + STEP * depth},
        {translateY: -200 - 6 * STEP * depth / scale }
      ]
    };
  }
}

const STEP = 8;
const CARD_COLORS = ['#d8d8d8', '#cccccc', '#a8a8a8'];

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  }
});
