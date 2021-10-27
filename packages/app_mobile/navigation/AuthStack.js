import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
//import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;