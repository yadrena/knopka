import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';

export default class Nickname extends React.Component {
  static propTypes = {
    nickname: PropTypes.string
  };

  render() {
    const {nickname} = this.props;
    if (!nickname)
      return null;
    return (
      <View style={styles.nickBox}>
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nickBox: {
    marginVertical: 16,
    backgroundColor: '#f5da99',
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  nickname: {
    color: '#695627',
    fontSize: 18,
    fontWeight: '500'
  }
});
