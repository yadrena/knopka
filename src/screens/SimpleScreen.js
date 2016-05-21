import React, {PropTypes} from 'react'
import {View, Text} from 'react-native';
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
          <Text style={commonStyles.header}>
            {this.props.header}
          </Text>
        }
        {
          this.props.message !== '' &&
          <Text style={commonStyles.text}>
            {this.props.message}
          </Text>
        }
        <Button onPress={this.onButtonPress} {...btnStyle}>
          {this.props.buttonText}
        </Button>
      </View>
    );
  }

  onButtonPress = () => {
    console.log('Simple screen button was pressed', this.props.onButtonPress);
    this.props.onButtonPress();
  }
}
