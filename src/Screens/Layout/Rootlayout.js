import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const RootLayout = props => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  return (
    <SafeAreaView
      style={{
        ...styles.root,
        ...props.style,
        backgroundColor: colors.rootColor,
      }}>
      <StatusBar
        animated={true}
        backgroundColor={
      '#fff'
        }
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScrollView style={{backgroundColor:"#fff"}}
      showsVerticalScrollIndicator={false}
      >
      {props.children}

      </ScrollView>
    </SafeAreaView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonTitleStyle: {
    margin: 10,
  },
});
