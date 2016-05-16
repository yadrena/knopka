import React, {PropTypes} from 'react'
import {View, Text, TextInput, Picker, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle, inputStyle} from '../styles/common';
import {connectToMat} from '../actions/Actions';
import WorkScreen from './WorkScreen';
import BusyIndicator from '../components/BusyIndicator';
import I18n from 'react-native-i18n';

class ConnectMat extends React.Component {
  static propTypes = {
    wifiLoaded: PropTypes.bool,
    wifiList: PropTypes.array,
    connectToMat: PropTypes.func
  };

  static mapStateToProps = state => ({
    wifiLoaded: state.wifis.loaded,
    wifiList: state.wifis.list.map( v => ({ssid: v.SSID, bssid: v.BSSID}))
  });

  state={
    wifi: null,
    password: ''
  };

  render() {
    const {wifiLoaded, wifiList, connectToMat} = this.props;
    const wifis = wifiLoaded ? wifiList.map(v => <Picker.Item key={v.ssid} label={v.ssid} value={v}/>) : null;
    return (
      <WorkScreen>
        <Text style={commonStyle.text}>{I18n.t('wifiLookup')}</Text>
        {!wifiLoaded && <BusyIndicator message={I18n.t('wifiScan')}/>}
        {wifiLoaded &&
        <Picker selectedValue={this.state.wifi} prompt={I18n.t('wifiLookup')} mode="dialog"
                onValueChange={wifi => this.setState({wifi})} style={styles.picker}>
          {wifis}
        </Picker>
        }
        {wifiLoaded &&
        <TextInput placeholder={I18n.t('password')} secureTextEntry={true} value={this.state.password}
          {...inputStyle}
                   onChangeText={password => this.setState({password})}/>
        }
        <Button onPress={this.onConnectPressed} {...buttonStyle}>{I18n.t('connect')}</Button>
      </WorkScreen>
    );
  }

  onConnectPressed = () => {
    this.props.connectToMat(this.state.wifi, this.state.password);
  }
}

export default connect(ConnectMat.mapStateToProps, {connectToMat})(ConnectMat);

var styles = StyleSheet.create({
  picker: {
    width: 300,
    color: 'white'
  }
});