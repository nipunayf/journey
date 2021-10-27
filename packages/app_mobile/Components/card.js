import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text,TouchableOpacity, Button} from 'react-native';
import {Card} from 'react-native-elements';
import Modal from "react-native-modal";

const CardComponent = props => {
  const [ isVisible, setIsVisible ] = useState(false);
  
  return (
    <View>
      <Modal isVisible={isVisible} >
        <View style={{ flex: 1 },{backgroundColor: 'white'}}>
          <Text style={{padding: 25}}>{props.content}</Text>
          <Button title="Close" onPress={() => setIsVisible(!isVisible)} />
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <Card>
          <Card.Title>{props.title}</Card.Title>
          <Card.Divider/>
          <Card.Image source={{ uri: props.url }} />
          <View style={{flexDirection:"row"},{justifyContent:'space-between'}}>
            <Text style={{fontWeight: "bold"}}>Arrival Time  : {props.Atime}</Text>
            <Text style={{fontWeight: "bold"}}>Depature Time : {props.Dtime}</Text>
          </View>  
        </Card>
      </TouchableOpacity>
    </View>
  );
};



export default CardComponent;
