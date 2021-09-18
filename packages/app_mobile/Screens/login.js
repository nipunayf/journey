import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import { Formik} from 'formik';
import { Button, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = props=> {

    return(
        <View style ={styles.screen}>
            <Text style ={styles.heading}>Welcome To Journey</Text>
            {/*<Image source = {require('../../../assets/journey-logo.png')} />*/}
            <Formik initialValues={{ email: '', password: '' }} onSubmit={values => Alert.alert(JSON.stringify(values))}>
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.formContainer}>           
            <TextInput
              value={values.email}
              style={styles.inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="Email Address"
              placeholderTextColor = 'black'
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: 'black' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
              style={styles.inputStyle}
              onChangeText={handleChange('password')}
              placeholder="Password"
              placeholderTextColor = 'black'
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: 'black' }}>{errors.password}</Text>
            }
            <Button
              color="#0277bd"
              title='Submit'
              disabled={!isValid}
              onPress={() => {alert('You tapped the button!');}}
            />
            </View>
            )}
          </Formik>
          <SocialIcon title='Sign In With Google' onPress={() => {alert('You tapped the button!');}} button type='google'/>
          <SocialIcon title='Sign In with Facebook' onPress={() => {alert('You tapped the button!');}} button type='facebook'/> 
          </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent:'center'
    },
    formContainer: {
        padding: 50 
    },
    inputStyle:{
        borderWidth: 1,
        borderColor: '#0277bd',
        padding: 12,
        marginBottom: 5,
        color:'black'
    },
    heading: {
        textAlign:'center',
        fontSize: 24
    }
})
export default Login;