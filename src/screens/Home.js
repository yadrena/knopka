import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BusyIndicator from '../components/BusyIndicator';
import {Button} from 'react-native-material-design';
import BTSerial from '../native/BTSerial';

export default class Home extends Component {
  state = {
    enabled: false
  };

  //[{"id":"58:71:33:80:05:E3","address":"58:71:33:80:05:E3","name":"RSB-101"}]
  componentDidMount() {
    BTSerial.isEnabled((error, enabled) => {
      if (enabled)
        BTSerial.listDevices((err, devices)=> console.log('Found devices: ', devices));
      this.setState({enabled})
    });

    BTSerial.setConnectionStatusCallback((e)=> {
      console.log('Connection status', JSON.stringify(e));
    });

    BTSerial.setDataAvailableCallback((e)=> {
      console.log('Data available', JSON.stringify(e));
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.enabled && <BusyIndicator message="Checking bluetooth..."/>}
        {this.state.enabled && <Button value="Connect" onPress={this.connect}/>}
      </View>
    );
  }

  connect = () => {
    BTSerial.connect('58:71:33:80:05:E3', function(err, status, deviceName){
    //BTSerial.connect('RSB-101', function(err, status, deviceName){
      console.log('Connect', err, status, deviceName);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});