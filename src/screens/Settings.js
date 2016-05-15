import React, {PropTypes} from 'react'
import {View, Text, TextInput, Switch, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import commonStyles, {inputStyle} from '../styles/common';
import WorkScreen from './WorkScreen';

class Settings extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  state = {
    nickname: '',
    receivePush: true
  };

  render() {
    const lefty = {
      title: 'Назад',
      action: Actions.pop
    };
    return (
      <WorkScreen lefty={lefty}>
        <TouchableWithoutFeedback onPress={this.onCameraPress}>
          <View style={styles.photo}/>
        </TouchableWithoutFeedback>
        <TextInput placeholder="Кличка" value={this.state.nickname} {...inputStyle}
                   onChangeText={(text) => this.setState({password: text})}/>
        <View style={styles.switchHolder}>
          <Text style={commonStyles.text}>Receive push notifications</Text>
          <Switch onValueChange={receivePush => this.setState({receivePush})}
                  value={this.state.receivePush} />
        </View>
      </WorkScreen>
    );
  }

  onCameraPress = () => {
    
  }
}

export default connect(Settings.mapStateToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'red'
  },
  switchHolder: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16
  }
});
