import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Appcontext } from './App'

const Testing = () => {
    const {count}=useContext(Appcontext)
    console.log('count',count);
    
  return (
    <View>
      <Text>Testing {count}</Text>
    </View>
  )
}

export default Testing

const styles = StyleSheet.create({})