import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, NativeModules, TouchableOpacity } from 'react-native';
import { DebugUtils } from './src/DebugUtils';
const { BatteryModule ,DeviceInfo} = NativeModules;

const App = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

  const [deviceName, setDeviceName] = useState('');

// useEffect(() => {
// NativeModules.DeviceInfo.getDeviceName()
// .then((name) => setDeviceName(name))
// .catch((error) => console.error(error));
// }, []);
console.log('deviceNamedeviceName',deviceName);

  const getBatteryLevel = () => {
    BatteryModule.getBatteryLevel((level) => {
      setBatteryLevel(level);
    });
  };
  // useEffect(() => {
  //   getBatteryLevel();

  //    DeviceInfo.getDeviceInfo((error, info) => {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       console.log(info)
  //       // this.setState({ deviceInfo: info });
  //     }
  //   });
  // }, []);
  // console.log('deviceinfooooo',DeviceInfo)
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    // Check debug mode on component mount
    const checkDebugMode = async () => {
      const debugStatus = DebugUtils.isDebugModeEnabled();
      setIsDebug(debugStatus);
      
      // Optional: Log debug status
      console.log('Debug Mode Enabled:', debugStatus);
    };

    checkDebugMode();
  }, []);

  const { CurrentVolume } = NativeModules;

CurrentVolume.getCurrentVolume()
  .then(volume => {
    console.log('Current volume:', volume);
  })
  .catch(error => {
    console.error('Error getting volume:', error);
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity */}
      <Text style={styles.welcome}>Battery Level: {batteryLevel}</Text>
      <Button title="Refresh Battery Level" onPress={getBatteryLevel} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
export default App;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, NativeModules } from 'react-native';
// import DeviceInfo from './src/Screens/DeviceInfo';

// const DeviceInfoScreen = () => {
//   const [deviceInfo, setDeviceInfo] = useState(null);
//   const [error, setError] = useState(null);
// const { BatteryModule } = NativeModules;


//    const [batteryLevel, setBatteryLevel] = useState(null);
//   const getBatteryLevel = () => {
//     BatteryModule.getBatteryLevel((level) => {
//       setBatteryLevel(level);
//     });
//   };
//   useEffect(() => {
//     getBatteryLevel();
//   }, []);

//   console.log('batteryLevel',batteryLevel);
  
//   useEffect(() => {
//     const fetchDeviceInfo = async () => {
//       try {
//         const info = await DeviceInfo.getDeviceInfo();
//         setDeviceInfo(info);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchDeviceInfo();
//   }, []);

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Error: {error}</Text>
//       </View>
//     );
//   }

//   if (!deviceInfo) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading device info...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Device Information</Text>
//       <View style={styles.infoContainer}>
//         <Text style={styles.infoText}>Model: {deviceInfo.model}</Text>
//         <Text style={styles.infoText}>
//           {Platform.OS === 'ios' ? 'System: ' + deviceInfo.systemName : 'Manufacturer: ' + deviceInfo.manufacturer}
//         </Text>
//         <Text style={styles.infoText}>System Version: {deviceInfo.systemVersion}</Text>
//         <Text style={styles.infoText}>Device Name: {deviceInfo.deviceName}</Text>
//         <Text style={styles.infoText}>Device ID: {deviceInfo.deviceId}</Text>
//         {Platform.OS === 'android' && (
//           <Text style={styles.infoText}>API Level: {deviceInfo.apiLevel}</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   infoContainer: {
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//     borderRadius: 8,
//     width: '100%',
//   },
//   infoText: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   error: {
//     color: 'red',
//     fontSize: 16,
//   },
// });

// export default DeviceInfoScreen;