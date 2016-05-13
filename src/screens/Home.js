import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from 'apsl-react-native-button'
import BluetoothShutter from '../native/BluetoothShutter';
import commonStyles from '../styles/common';

export default class Home extends Component {
  state = {
    pressed: false
  };

  //[{"id":"58:71:33:80:05:E3","address":"58:71:33:80:05:E3","name":"RSB-101"}]
  componentDidMount() {
    BluetoothShutter.init();
    BluetoothShutter.listenShutter(() => {
      console.log('Shutter pressed!!');
      this.setState({pressed: true});
    });
  }

  render() {
    const content = this.state.pressed ? this.renderPressed() : this.renderSimple();
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }

  renderSimple = () => {
    return (
      <Text style={styles.label}>Ваш питомец не скучает!</Text>
    );
  };

  renderPressed = () => {
    return [
      <Image key="img" source={{uri: 'dog'}} style={{width: 167, height: 275}} />,
      <Text key="txt" style={styles.label}>Ваш питомец соскучился!</Text>,
      <Button key="btn" onPress={this.onCancel} style={commonStyles.button}>OK</Button>
    ]
  };

  onCancel = () => {
    console.log('Cancel');
    this.setState({pressed: false});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  label: {
    fontSize: 24,
    color: 'white'
  }
});