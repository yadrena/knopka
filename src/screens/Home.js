import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, Text, StyleSheet, Image} from 'react-native';
import {popNotification} from '../actions/Actions';
import commonStyles from '../styles/common';
import WorkScreen from './WorkScreen';
import CardStack from '../components/CardStack';
import I18n from 'react-native-i18n';

class Home extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    popNotification: PropTypes.func
  };

  static mapStateToProps = state => ({
    notifications: state.notifications,
    avatar: state.settings.avatar,
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
    return (
      <WorkScreen righty={righty} lefty={null} contentStyle={{justifyContent: 'flex-start'}}>
        <CardStack {...{notifications,avatar,nickname}} onRemove={this.onRemove}/>
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