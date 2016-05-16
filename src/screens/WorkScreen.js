import React, {PropTypes} from 'react'
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import WorkScreenHeader from '../components/WorkScreenHeader';
import I18n from 'react-native-i18n';

export default class WorkScreen extends React.Component {
  static propTypes = {
    lefty: PropTypes.object,
    righty: PropTypes.object,
    contentStyle: PropTypes.object
  };

  static defaultProps = {
    lefty: {
      title: '<',
      action: Actions.pop
    }
  };

  render() {
    let {lefty, righty} = this.props;
    return (
      <View style={styles.container}>
        <WorkScreenHeader lefty={lefty} righty={righty}/>
        <View style={[styles.content, this.props.contentStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  }
});
