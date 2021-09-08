/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {Button, StyleSheet,Text,View} from 'react-native';
 import Header from './Components/Header';
 import ItineraryScreen from './Screens/itinerary';
 
 export default function App(){
   return(
     <View style= {styles.screen}>
       <Header title ="Your travel itinerary" />
       <ItineraryScreen />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   screen:{
     flex: 1
   }
 })
 
 
 
 