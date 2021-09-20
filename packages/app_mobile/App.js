import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/login';
import ItineraryScreen from './Screens/itinerary'

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Travel Itinerary" component={ItineraryScreen} options={{title: 'Your Travel Itinerary',headerTitleAlign: 'center',headerStyle: {
            backgroundColor: '#c7c7c7',
          }}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
