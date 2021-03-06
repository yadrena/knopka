import React, {PropTypes} from 'react'
import {View, Text, TextInput, Switch, Image, TouchableWithoutFeedback, StyleSheet, NativeModules} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setAvatar, setNickname, setReceivePush, checkBattery} from '../actions/Actions';
import commonStyles, {inputStyle} from '../styles/common';
import WorkScreen from './WorkScreen';
import Avatar from '../components/Avatar';
import Battery from '../components/Battery';
import I18n from '../i18n/i18n';

const ImagePickerManager = NativeModules.ImagePickerManager;

class Settings extends React.Component {
  static propTypes = {
    avatar: PropTypes.object,
    nickname: PropTypes.string,
    receivePush: PropTypes.bool,
    setAvatar: PropTypes.func,
    setNickname: PropTypes.func,
    setReceivePush: PropTypes.func,
    checkBattery: PropTypes.func,
    battery: PropTypes.object
  };

  static mapStateToProps = state => ({...state.settings});

  componentDidMount(){
    this.props.checkBattery();
  }

  render() {
    const lefty = {
      title: I18n.t('settings.back'),
      action: Actions.pop
    };
    return (
      <WorkScreen lefty={lefty}>
        <View style={styles.container}>
          <Avatar avatar={this.props.avatar} onPress={this.onCameraPress}/>
          <TextInput placeholder={I18n.t('settings.nickname')} value={this.props.nickname} {...inputStyle}
                     onChangeText={this.props.setNickname}/>
          <View style={styles.switchHolder}>
            <Text style={commonStyles.text}>{I18n.t('settings.receivePush')}</Text>
            <Switch onValueChange={this.props.setReceivePush}
                    value={this.props.receivePush}/>
          </View>
          <Battery loading={this.props.battery.loading} charge={this.props.battery.charge}/>
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
      else {
        // You can display the image using either data:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        const source = {uri: response.uri, isStatic: true};
        this.props.setAvatar(source);
      }
    });
  }
}

export default connect(Settings.mapStateToProps, {setAvatar, setNickname, setReceivePush, checkBattery})(Settings);

const cameraOptions = {
  title: I18n.t('settings.camera.title'), // specify null or empty string to remove the title
  cancelButtonTitle: I18n.t('settings.camera.cancel'),
  takePhotoButtonTitle: I18n.t('settings.camera.takePhoto'), // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: I18n.t('settings.camera.library'), // specify null or empty string to remove this button
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
    alignItems: 'center'
  },
  switchHolder: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16
  }
});
