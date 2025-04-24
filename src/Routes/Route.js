import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Cart from '../Screens/Cart';

const Route = () => {
    const Stack = createNativeStackNavigator();

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}  />
        <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}}  />



      </Stack.Navigator>
    </NavigationContainer>
  
  )
}

export default Route

const styles = StyleSheet.create({})