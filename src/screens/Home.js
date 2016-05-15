import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import commonStyles from '../styles/common';
import WorkScreen from './WorkScreen';

export default class Home extends Component {

  render() {
    const righty = {
      title: 'Настройки',
      action: () => console.log('Righty!')
    };
    return (
      <WorkScreen righty={righty}>
        <Text style={[commonStyles.text, styles.label]}>
          {'Скоро тут появятся\n сообщения от вашего\n питомца.'}
        </Text>
        <View style={{backgroundColor: 'red'}}>
          <Image key='dog' source={require('../assets/dog.jpg')}/>
        </View>
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

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    margin: 16
  }
});