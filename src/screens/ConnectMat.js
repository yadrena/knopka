import React, {PropTypes} from 'react'
import {View, Text, TextInput, Picker, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle, inputStyle} from '../styles/common';
import {connectToMat, checkWifi} from '../actions/Actions';
import WorkScreen from './WorkScreen';
import BusyIndicator from '../components/BusyIndicator';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ConnectMat extends React.Component {
  static propTypes = {
    loaded: PropTypes.bool,
    list: PropTypes.array,
    error: PropTypes.string,
    connectToMat: PropTypes.func,
    checkWifi: PropTypes.func
  };

  static mapStateToProps = state => ({
    loaded: state.wifis.loaded,
    list: state.wifis.list.map( v => ({ssid: v.SSID, bssid: v.BSSID})),
    error: state.wifis.error
  });

  state = {
    wifi: null,
    password: ''
  };

  render() {
    const {loaded, error} = this.props;
    const content =
      error.length > 0 ?
        this.renderError(error) :
        (loaded ? this.renderLoaded() : this.renderLoading());

    return (
      <WorkScreen>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={[commonStyle.header, {marginBottom: 24}]}>{I18n.t('wifiLookup')}</Text>
        </View>
        <View style={{flex: 2, justifyContent: 'flex-start'}}>
          {content}
        </View>
      </WorkScreen>
    );
  }
  
  renderError = (error) => {
    return (
      <View style={styles.listGroup}>
        <Text style={commonStyle.error}>{error}</Text>
        <Icon.Button name="refresh" backgroundColor="#101010" onPress={this.props.checkWifi}/>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <BusyIndicator message={I18n.t('wifiScan')}/>
    );
  };

  renderLoaded = () => {
    const {list} = this.props;
    const result = [this.renderList()];
    if (list.length > 0){
      result.push(
        <TextInput placeholder={I18n.t('password')} secureTextEntry={true} value={this.state.password}
          {...inputStyle} onChangeText={password => this.setState({password})}/>
      );
      result.push(
        <Button onPress={this.onConnectPressed} {...buttonStyle}>{I18n.t('connect')}</Button>
      )
    }
    return result;
  };

  renderList = () => {
    return (
      <View style={styles.listGroup}>
        {this.renderPicker()}
        <Icon.Button name="refresh" backgroundColor="#101010" onPress={this.props.checkWifi}/>
      </View>
    )
  };

  renderPicker = () => {
    const {list} = this.props;
    if (list.length > 0){
      const wifis = list.map(v => <Picker.Item key={v.ssid} label={v.ssid} value={v}/>);
      return (
        <Picker selectedValue={this.state.wifi} prompt={I18n.t('wifiLookup')} mode="dialog"
                onValueChange={wifi => this.setState({wifi})} style={styles.picker}>
          {wifis}
        </Picker>
      );
    }
    else {
      return <Text style={commonStyle.text}>{I18n.t('noWifis')}</Text>;
    }
  };

  onConnectPressed = () => {
    this.props.connectToMat(this.state.wifi, this.state.password);
  }
}

export default connect(ConnectMat.mapStateToProps, {connectToMat, checkWifi})(ConnectMat);

var styles = StyleSheet.create({
  picker: {
    flex: 1,
    width: 250,
    color: 'white'
  },
  listGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});