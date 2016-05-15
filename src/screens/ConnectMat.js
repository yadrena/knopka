import React, {PropTypes} from 'react'
import {View, Text, TextInput, Picker, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle, inputStyle} from '../styles/common';
import {Actions} from 'react-native-router-flux';
import WorkScreen from './WorkScreen';
import BusyIndicator from '../components/BusyIndicator';

class ConnectMat extends React.Component {
  static propTypes = {
    wifiLoaded: PropTypes.bool,
    wifiList: PropTypes.array
  };

  static mapStateToProps = state => ({
    wifiLoaded: state.wifis.loaded,
    wifiList: state.wifis.list.map( v => v.SSID)
  });

  state={
    wifi: null,
    password: ''
  };

  render() {
    const {wifiLoaded, wifiList} = this.props;
    const wifis = wifiLoaded ? wifiList.map(ssid => <Picker.Item key={ssid} label={ssid} value={ssid}/>) : null;
    return (
      <WorkScreen>
        <Text style={commonStyle.text}>Choose network</Text>
        {!wifiLoaded && <BusyIndicator message="Scanning wifi networks..."/>}
        {wifiLoaded &&
        <Picker selectedValue={this.state.wifi} prompt="Choose network" mode="dialog"
                onValueChange={wifi => this.setState({wifi})} style={styles.picker}>
          {wifis}
        </Picker>
        }
        {wifiLoaded &&
        <TextInput placeholder="Password" secureTextEntry={true} value={this.state.password}
          {...inputStyle}
                   onChangeText={password => this.setState({password})}/>
        }
        <Button onPress={Actions.home} {...buttonStyle}>Connect</Button>
      </WorkScreen>
    );
  }
}

export default connect(ConnectMat.mapStateToProps)(ConnectMat);

var styles = StyleSheet.create({
  picker: {
    width: 300,
    color: 'white'
  }
});