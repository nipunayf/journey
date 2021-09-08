import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
//import CardComponent from '../Components/card';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const ItineraryScreen = props =>{
    
    return(
       
        <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
              <View >
                <Image
                  
                  resizeMode="cover"
                  source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}
                />
                <Text >hawdurh</Text>
              </View>
      </Card>
    );
};



export default ItineraryScreen;