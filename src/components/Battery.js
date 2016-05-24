import React, {PropTypes} from 'react'
import commonStyles from '../styles/common';
import {View, Text, Image, StyleSheet} from 'react-native';
import I18n from '../i18n/i18n';
import BusyIndicator from './BusyIndicator';

export default class Battery extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    charge: PropTypes.number
  };

  render() {
    const {loading, charge} = this.props;
    const src = charge > 70 ? require('../assets/battery_full.png') : 
                charge < 20 ? require('../assets/battery_low.png') : 
                require('../assets/battery_half.png');
    return (
      <View style={styles.container}>
        <Text style={commonStyles.text}>{I18n.t('settings.charge')}</Text>
        { loading ? <BusyIndicator/> : <Image source={src} style={{width: 44, height: 20}}/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16
  }
});
