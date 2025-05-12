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

