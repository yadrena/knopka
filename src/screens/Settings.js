import React, {PropTypes} from 'react'
import {View, Text, TextInput, Switch, Image, TouchableWithoutFeedback, StyleSheet, NativeModules} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import commonStyles, {inputStyle} from '../styles/common';
import WorkScreen from './WorkScreen';

const ImagePickerManager = NativeModules.ImagePickerManager;

class Settings extends React.Component {
  static propTypes = {};

  static mapStateToProps = state => ({});

  state = {
    nickname: '',
    receivePush: true,
    avatarSource: null
  };

  render() {
    const lefty = {
      title: 'Назад',
      action: Actions.pop
    };
    const photoContent = this.state.avatarSource ?
      <Image source={this.state.avatarSource} style={styles.photo}/> :
      <View style={[styles.photo, {backgroundColor: 'red'}]}/>;

    return (
      <WorkScreen lefty={lefty}>
        <TouchableWithoutFeedback onPress={this.onCameraPress}>
          {photoContent}
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
    ImagePickerManager.showImagePicker(cameraOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        const source = {uri: response.uri, isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }
}

export default connect(Settings.mapStateToProps)(Settings);

const cameraOptions = {
  title: 'Select Pet Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'front', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  maxWidth: 500, // photos only
  maxHeight: 500, // photos only
  aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.9, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  switchHolder: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16
  }
});
