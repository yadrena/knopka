import React, {PropTypes} from 'react'
import {View, StyleSheet} from 'react-native';
import Button from 'apsl-react-native-button';
import {linkStyle} from '../styles/common';
import CaesarLogo from './CaesarLogo';

export default class WorkScreenHeader extends React.Component {
  static propTypes = {
    lefty: PropTypes.object,
    righty: PropTypes.object
  };

  render() {
    const {lefty, righty} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.col}>
          {lefty && <Button onPress={lefty.action} {...linkStyle}>{lefty.title}</Button>}
        </View>
        <View style={styles.col}>
          <CaesarLogo/>
        </View>
        <View style={styles.col}>
          {righty && <Button onPress={righty.action} {...linkStyle}>{righty.title}</Button>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8
  },
  col: {
    flex: 1
  }
});
