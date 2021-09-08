import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const CardComponent = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.location}</Text>
        <Image style={styles.image} source={{uri: props.url}} />
        <View>
          <Text>{props.info}</Text>
          <View style={styles.time}>
            <Text>Arrival time {props.Atime}</Text>
            <Text>Departure time - {props.Dtime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  content: {
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  image: {
    width: 100,
    height: 50,
    padding: 35,
  },
  time: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardComponent;
