import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Button from 'apsl-react-native-button';
import commonStyle, {buttonStyle} from '../styles/common';
import {Actions} from 'react-native-router-flux';

class ConnectMat extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  render() {
    return (
      <View style={styles.container}>
        <Text style={commonStyle.text}>Networks...</Text>
        <Button onPress={Actions.home} {...buttonStyle}>Connect</Button>
      </View>
    );
  }
}

export default connect(ConnectMat.mapStateToProps)(ConnectMat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
