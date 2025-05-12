import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, NativeModules, TouchableOpacity, View } from 'react-native';
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
      console.log('debugStatus',debugStatus);
      
      setIsDebug(debugStatus);
      
      // Optional: Log debug status
      console.log('Debug Mode Enabled:', debugStatus);
    };

    checkDebugMode();
  }, []);

  const { CurrentVolume } = NativeModules;
  const [volume,setVolume]=useState(0)

CurrentVolume.getCurrentVolume()
  .then(volume => {
    console.log('Current volume:', volume);
    setVolume(volume)
  })
  .catch(error => {
    console.error('Error getting volume:', error);
  });
   const refreshVolume = async () => {
  try {
    const volume = await CurrentVolume.getCurrentVolume();
    console.log('Current volume:', volume);
    // You can update state if needed
    setVolume(volume);
  } catch (error) {
    console.error('Error getting volume:', error);
  }
};
console.log('isdebug',isDebug);
const increaseVolume = async () => {
  try {
    await CurrentVolume.setMediaVolume(volume+1); // set volume to level 7
    refreshVolume()
    console.log('Volume updated');
  } catch (err) {
    console.error(err);
  }
};
const DecreaseVol = async () => {
  try {
    await CurrentVolume.setMediaVolume(volume-1); // set volume to level 7
    refreshVolume()
    console.log('Volume updated');
  } catch (err) {
    console.error(err);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity */}
      <Text style={styles.welcome}>Battery Level: {batteryLevel} %</Text>
      <Text >Current volume :  {volume}</Text>
      <Text >App Is Debug :  {isDebug}</Text>


<TouchableOpacity onPress={()=>{
  getBatteryLevel()
  refreshVolume()
}} 
style={{backgroundColor:'#000',marginTop:20,padding:20,borderRadius:20}}
>

  <Text style={{color:'#fff'}}> Refresh all data</Text>
</TouchableOpacity>
<View style={{justifyContent:'space-between',flexDirection:'row',}}>
 <TouchableOpacity onPress={()=>{
  increaseVolume()
}} 
style={{backgroundColor:'#000',marginTop:20,padding:20,borderRadius:20,}}
>

  <Text style={{color:'#fff'}}> increase volume</Text>
</TouchableOpacity>
 <TouchableOpacity onPress={()=>{
  DecreaseVol()
}} 
style={{backgroundColor:'#000',marginTop:20,padding:20,borderRadius:20,marginLeft:5}}
>

  <Text style={{color:'#fff'}}> DecreaseVolume</Text>
</TouchableOpacity>
</View>
    
      
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