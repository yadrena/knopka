import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, Text, StyleSheet, Image} from 'react-native';
import commonStyles from '../styles/common';
import WorkScreen from './WorkScreen';

class Home extends Component {

  render() {
    const righty = {
      title: 'Настройки',
      action: Actions.settings
    };
    return (
      <WorkScreen righty={righty}>
        <Text style={[commonStyles.text, styles.label]}>
          {'Скоро тут появятся\n сообщения от вашего\n питомца.'}
        </Text>
        <Image key='dog' source={require('../assets/dog.jpg')}/>
        <Text style={[commonStyles.text, styles.label]}>
          {'...а пока можно перейти\n' +
          'в Настройки, чтобы\n' +
          'указать его кличку\n' +
          'и добавить фотографию.'}
        </Text>
      </WorkScreen>
    );
  }

}

export default connect()(Home);

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    margin: 16
  }
});