import React, {PropTypes} from 'react'
import {View, StyleSheet} from 'react-native';
import WorkScreenHeader from '../components/WorkScreenHeader';

export default class WorkScreen extends React.Component {
  static propTypes = {
    lefty: PropTypes.object,
    righty: PropTypes.object,
    contentStyle: PropTypes.object
  };

  render() {
    return (
      <View style={styles.container}>
        <WorkScreenHeader lefty={this.props.lefty} righty={this.props.righty}/>
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
    justifyContent: 'center'
  }
});
