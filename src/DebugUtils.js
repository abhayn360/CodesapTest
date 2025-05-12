import { NativeModules, Platform } from 'react-native';

export const DebugUtils = {
  isDebugModeEnabled: () => {
    if (Platform.OS === 'android') {
      try {
        // Method 1: Using DevSettings (basic method)
        const isDevSettingsDebug = NativeModules.DevSettings?.isInspectorShown || false;
        
        // Method 2: Using custom native module (recommended)
        const isCustomModuleDebug = NativeModules.DebugModeModule 
          ? NativeModules.DebugModeModule.isDebugModeEnabled()
          : false;
        
        return isDevSettingsDebug || isCustomModuleDebug;
      } catch (error) {
        console.error('Debug mode check error:', error);
        return false;
      }
    }
    return false;
  },

  getDeviceInfo: () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        try {
          NativeModules.DebugModeModule.getDeviceInfo((deviceInfo, isDebug) => {
            resolve({
              deviceInfo,
              isDebug
            });
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Device info only available on Android'));
      }
    });
  }
};