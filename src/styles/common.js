import {StyleSheet } from 'react-native';

const BACKGROUND_COLOR = '#101010';
const FONT_FAMILY = 'cesar';
const DARK_GRAY = '#535353';
const LIGHT_GRAY = '#a6a6a6';
const TEXT_BLACK = '#0f0f0f';
const TEXT_WHITE = '#ffffff';
const TEXT_ERROR = '#ff0000';

const components = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 24,
    margin: 8,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff'
  },
  buttonText: {
    fontFamily: FONT_FAMILY,
    color: TEXT_BLACK
  },
  buttonLink: {
    height: 48,
    margin: 8,
    borderWidth: 0
  },
  linkText: {
    fontFamily: FONT_FAMILY,
    color: LIGHT_GRAY
  },
  input: {
    color: LIGHT_GRAY,
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    margin: 8
  },
  header: {
    color: TEXT_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: 24
  },
  text: {
    color: TEXT_WHITE,
    fontFamily: FONT_FAMILY
  },
  error: {
    fontFamily: FONT_FAMILY,
    color: TEXT_ERROR
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60
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
  placeholderTextColor: DARK_GRAY,
  underlineColorAndroid: DARK_GRAY
};

export const loginScreensStyle = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 16,
    backgroundColor: BACKGROUND_COLOR
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const workScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'stretch'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  }
});

export default components;