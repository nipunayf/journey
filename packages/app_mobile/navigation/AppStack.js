import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ItineraryScreen from '../Screens/itinerary';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Travel Itinerary" component={ItineraryScreen} options={{title: 'Your Travel Itinerary',headerTitleAlign: 'center',headerStyle: {
                backgroundColor: '#c7c7c7',
                }}}/>
        </Stack.Navigator>
    );
};

export default AppStack;
