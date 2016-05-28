import React, {PropTypes} from 'react'
import {View, StyleSheet, Animated, PanResponder} from 'react-native';
import NotificationCard, {CARD_SIZE} from './NotificationCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

export default class CardStack extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    onRemove: PropTypes.func,
    onSwipe: PropTypes.func
  };

  state = {
    pan: new Animated.ValueXY(),
    disappear: new Animated.Value(0),
    center: null, // 180, 262.5
    trashDropZone: null,//trash bin position in screen coordinate space
    trashOver: false
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: (e, gestureState) => {
        this.setTrashOver(this.isOverTrash(gestureState));
        Animated.event([{dx: this.state.pan.x, dy: this.state.pan.y}])(gestureState);
      },

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = _.clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = _.clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD && this.props.notifications.length > 1) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this.onCardSwiped)
        }
        else if (this.state.trashOver){
          Animated.timing(this.state.disappear, {
            toValue: 0.01,
            duration: 300
          }).start(this.onCardRemoved)
        }
        else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
        this.setTrashOver(false);
      }
    })
  }

  componentDidMount(){
    this.state.disappear.setValue(1);
  }

  render() {
    const {pan, center} = this.state;
    const {notifications, avatar, nickname} = this.props;
    const lastThree = _.takeRight(notifications, 3);
    const content = [];
    if (center !== null) {
      for (let i = 0; i < lastThree.length; i++) {
        let note = lastThree[i];
        let d = lastThree.length - 1 - i;
        const cardStyle = {backgroundColor: CARD_COLORS[d]};
        const panHandlers = d === 0 ? this._panResponder.panHandlers : {};
        content.push(
          <Animated.View style={this.getCardStyle(d, pan.getTranslateTransform())}
                         key={'card'+note.timestamp+'_'+d} {...panHandlers}>
            <NotificationCard depth={d} notification={note}
                              avatar={avatar} nickname={nickname}
                              style={cardStyle}/>
          </Animated.View>
        );
      }
    }

    return (
      <View style={styles.stack} onLayout={this.onLayoutComplete}>
        {content}
        <View ref="trashBin" key="delIcon" style={styles.trash}>
          <Icon name="delete" size={this.state.trashOver ? 50 : 40} color={this.state.trashOver ? '#ff0000' : '#a6a6a6'} />
        </View>
      </View>
    );

  }

  onLayoutComplete = ({nativeEvent: { layout: {x, y, width, height}}}) => {
    //console.log('Layout complete', {x, y, width, height});
    this.refs['trashBin'].measureInWindow((x,y,width,height) => {
      //console.log('Measured:', x,y,width, height);
      this.setState({
        trashDropZone: {
          left: x,
          right: x + width,
          top: y,
          bottom: y + height
        }
      });
    });
    this.setState({
      center: {
        x: width / 2,
        y: height / 2
      }
    });
  };

  getCardStyle = (depth, pan) => {
    const {x, y} = this.state.center;
    const stackPos = 3 - depth;
    const scale = depth === 0 ? this.state.disappear : (1 - 0.1 * depth);
    const panTransform = depth === 0 ? pan : [];
    return {
      position: 'absolute',
      elevation: 1 + stackPos,
      transform: [
        ...panTransform,
        {translateX: x - CARD_SIZE.width / 2},
        {translateY: y + CENTER_Y - CARD_SIZE.height / 2 - 4 * STEP * depth},
        {scale}
      ]
    };
  };

  isOverTrash = (gesture) => {
    const {left, right, top, bottom} = this.state.trashDropZone;
    const {moveX, moveY} = gesture;
    return (moveX >= left && moveX <= right && moveY >= top && moveY <= bottom);
  };

  onCardSwiped = ({finished}) => {
    console.log('Card swiped', finished);
    this.state.disappear.setValue(1);
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onSwipe();
  };

  onCardRemoved = ({finished}) => {
    console.log('Card removed', finished);
    this.state.disappear.setValue(1);
    this.state.pan.setValue({x: 0, y: 0});
    this.props.onRemove();
  };

  setTrashOver = trashOver => this.setState({trashOver});
}

const SWIPE_THRESHOLD = 100;
const CENTER_Y = -15;
const STEP = 8;
const CARD_COLORS = ['#d8d8d8', '#cccccc', '#a8a8a8'];

const styles = StyleSheet.create({
  stack: {
    flex: 1
  },
  trash: {
    position: 'absolute',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 16,
    backgroundColor: '#101010'
  }
});
