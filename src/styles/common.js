import {StyleSheet } from 'react-native';

const components = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 24,
    margin: 8,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff'
  },
  buttonText: {
    color: 'black'
  },
  buttonLink: {
    height: 48,
    margin: 8
  },
  linkText: {
    color: 'white'
  },
  input: {
    color: 'white',
    margin: 8
  },
  header: {
    color: 'white',
    fontSize: 24
  },
  text: {
    color: 'white'
  }
});

export const buttonStyle = {
  style: components.button,
  textStyle: components.buttonText
};

export const linkStyle = {
  style: components.buttonLink,
  textStyle: components.linkText
};

export const inputStyle = {
  style: components.input,
  placeholderTextColor: 'white',
  underlineColorAndroid: 'white'
};

export const loginScreensStyle = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'black'
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default components;