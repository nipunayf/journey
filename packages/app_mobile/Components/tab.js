import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/login';
import ItineraryScreen from '../Screens/itinerary';
import { View,Image,Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false}} tabBarOptions={{showLabel:false}}>
            <Tab.Screen  name ="Login" component={Login}
            options={{
            tabBarIcon: (focused) => (
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                <Image source={require('../assests/icons/home.png')}
                resizeMode = "contain"
                style={{
                width: 55,
                height:55,
                padding:4
                }}
                />
                <Text style={{fontSize:12},{color:'black'}}>Home</Text>     
                </View>
              )}}  
            />
           <Tab.Screen  name ="Home" component={ItineraryScreen}
           options={{
            tabBarIcon: (focused) => (
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                <Image source={require('../assests/icons/itinerary.png')}
                resizeMode = "contain"
                style={{
                width: 40,
                height:50,
                padding:4
                }}
                />
                <Text style={{fontSize:12},{color:'black'}}>Home</Text>     
                </View>
              )}}/>
        </Tab.Navigator>
    );

}

export default Tabs;