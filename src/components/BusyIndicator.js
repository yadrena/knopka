import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GiftedSpinner  from 'react-native-gifted-spinner';

export default class BusyIndicator extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedSpinner/>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});