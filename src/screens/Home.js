import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, Text, StyleSheet, Image} from 'react-native';
import {popNotification} from '../actions/Actions';
import commonStyles from '../styles/common';
import WorkScreen from './WorkScreen';
import NotificationCard from '../components/NotificationCard';
import I18n from 'react-native-i18n';
import _ from 'lodash';

class Home extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    popNotification: PropTypes.func
  };

  static mapStateToProps = state => ({
    notifications: state.notifications,
    avatar: state.settings.notifications,
    nickname: state.settings.nickname
  });

  render() {
    const notifications = this.props.notifications;
    const righty = {
      title: I18n.t('settings'),
      action: Actions.settings
    };
    if (notifications.length > 0)
      return this.renderStack(righty);
    else
      return this.renderPlaceholder(righty);
  }

  renderStack = (righty) => {
    const {notifications,avatar,nickname} = this.props;
    const lastThree = _.takeRight(notifications, 3);
    const content = [];
    for (let i = 0; i < lastThree.length; i++) {
      let note = lastThree[i];
      let d = lastThree.length - 1 - i;
      content.push(
        <NotificationCard key={'note'+i} depth={d} notification={note}
                          avatar={avatar} nickname={nickname}
                          onRemove={this.onRemove}/>
      );
    }
    return (
      <WorkScreen righty={righty} lefty={null} contentStyle={{justifyContent: 'flex-start'}}>
        <View style={styles.stack}>
          {content}
        </View>
      </WorkScreen>
    );
  };

  onRemove = () => {
    this.props.popNotification();
  };

  renderPlaceholder = (righty) => {

    return (
      <WorkScreen righty={righty} lefty={null}>
        <Text style={[commonStyles.text, styles.label]}>
          {I18n.t('homeEmptyUpper')}
        </Text>
        <Image key='dog' source={require('../assets/dog.png')}/>
        <Text style={[commonStyles.text, styles.label]}>
          {I18n.t('homeEmptyLower')}
        </Text>
      </WorkScreen>
    );
  };

}

export default connect(Home.mapStateToProps, {popNotification})(Home);

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    margin: 16
  },
  stack: {
    width: 250,
    height: 450
  }
});