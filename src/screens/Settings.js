import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import commonStyles from '../styles/common';
import WorkScreen from './WorkScreen';

class Settings extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  render() {
    const lefty = {
      title: 'Назад',
      action: Actions.pop
    };
    return (
      <WorkScreen lefty={lefty}>
        <Text style={commonStyles.text}>
          {'Скоро тут появятся\n сообщения от вашего\n питомца.'}
        </Text>
      </WorkScreen>
    );
  }
}

export default connect(Settings.mapStateToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
