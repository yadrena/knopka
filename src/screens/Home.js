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
      title: I18n.t('home.settings'),
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
      <WorkScreen righty={righty} lefty={null} contentStyle={styles.stack}>
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
        <View style={styles.third}>
          <Text style={[commonStyles.text, styles.label]}>
            {I18n.t('home.topLabel')}
          </Text>
        </View>
        <View style={styles.third}>
          <Image key='dog' source={require('../assets/dog.png')}/>
        </View>
        <View style={styles.third}>
          <Text style={[commonStyles.text, styles.label]}>
            {I18n.t('home.bottomLabel')}
          </Text>
        </View>
      </WorkScreen>
    );
  };

}

export default connect(Home.mapStateToProps, {popNotification})(Home);

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    textAlign: 'center'
  },
  stack: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0
  },
  third: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});