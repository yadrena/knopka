import React, {PropTypes} from 'react'
import {View, StyleSheet, Animated, PanResponder} from 'react-native';
import NotificationCard from './NotificationCard';
import _ from 'lodash';

export default class CardStack extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    onRemove: PropTypes.func
  };

  state = {
    pan: new Animated.ValueXY()
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null,// ignore the native event
        // extract dx and dy from gestureState
        // like 'pan.x = gestureState.dx, pan.y = gestureState.dy'
        {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = _.clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = _.clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this.onCardRemoved)
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  render() {
    const {notifications, avatar, nickname, onRemove} = this.props;
    const {pan} = this.state;
    const lastThree = _.takeRight(notifications, 3);
    const content = [];
    for (let i = 0; i < lastThree.length; i++) {
      let note = lastThree[i];
      let d = lastThree.length - 1 - i;
      const cardStyle = {backgroundColor: CARD_COLORS[d]};
      content.push(
        <Animated.View style={this.getCardStyle(d, pan.getTranslateTransform())} key={'card'+note.timestamp} {...this._panResponder.panHandlers}>
          <NotificationCard depth={d} notification={note}
                            avatar={avatar} nickname={nickname}
                            onRemove={onRemove} style={cardStyle}/>
        </Animated.View>
      );
    }

    return (
      <View style={styles.stack}>
        {content}
      </View>
    );
  }

  getCardStyle = (depth, pan) => {
    const stackPos = 3 - depth;
    const scale = 1 - 0.1 * depth;
    const panTransform = depth === 0 ? pan : [];
    return {
      position: 'absolute',
      elevation: 1 + stackPos,
      transform: [
        {scale},
        ...panTransform,
        {translateX: 70 + STEP * depth},
        {translateY: -200 - 6 * STEP * depth / scale}
      ]
    };
  };

  onCardRemoved = ({finished}) => {
    console.log('Card removed', finished);
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onRemove();
  }
}

const SWIPE_THRESHOLD = 80;
const STEP = 8;
const CARD_COLORS = ['#d8d8d8', '#cccccc', '#a8a8a8'];

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'//,
    //backgroundColor: 'pink'
  }
});
