import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Components/tab'

export default function App() {
  return ( 
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
