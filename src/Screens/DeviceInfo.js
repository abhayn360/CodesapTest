import { NativeModules, Platform } from 'react-native';

const { DeviceInfo } = NativeModules;

export default {
  getDeviceInfo: () => {
    return DeviceInfo.getDeviceInfo();
  }
};