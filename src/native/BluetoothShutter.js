var { NativeModules, DeviceEventEmitter } = require('react-native');

var BluetoothShutter = NativeModules.BluetoothShutter;

BluetoothShutter.listenShutter = function(cb) {
  if (DeviceEventEmitter.addListener) {
    DeviceEventEmitter.addListener('BLUETOOTH_PRESSED', cb);
  }
};

module.exports = BluetoothShutter;