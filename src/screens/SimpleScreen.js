import React, {PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import CaesarLogo from '../components/CaesarLogo';
import Button from 'apsl-react-native-button';
import commonStyles, {buttonStyle, linkStyle, loginScreensStyle} from '../styles/common';

export default class SimpleScreen extends React.Component {
  static propTypes = {
    bigLogo: PropTypes.bool,
    header: PropTypes.string,
    message: PropTypes.string,
    buttonText: PropTypes.string,
    buttonStyle: PropTypes.oneOf(['button', 'link']),
    onButtonPress: PropTypes.func
  };

  static defaultProps = {
    bigLogo: true,
    header: '',
    message: '',
    buttonStyle: 'link'
  };

  render() {
    const btnStyle = this.props.buttonStyle === 'button' ? buttonStyle : linkStyle;
    return (
      <View style={loginScreensStyle.rootContainer}>
        <CaesarLogo big={this.props.bigLogo}/>
        {
          this.props.header !== '' &&
          <View style={styles.header}>
            <Text style={commonStyles.header}>
              {this.props.header}
            </Text>
          </View>
        }
        {
          this.props.message !== '' &&
          <View style={styles.message}>
            <Text style={[commonStyles.text, {fontSize: 18}]}>
              {this.props.message}
            </Text>
          </View>
        }
        {
          this.props.buttonText !== '' &&
          <Button onPress={this.onButtonPress} {...btnStyle}>
            {this.props.buttonText}
          </Button>
        }
      </View>
    );
  }

  onButtonPress = () => {
    console.log('Simple screen button was pressed', this.props.onButtonPress);
    this.props.onButtonPress();
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    flex: 2,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
});