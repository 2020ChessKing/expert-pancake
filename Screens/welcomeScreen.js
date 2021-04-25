import { StatusBar } from 'expo-status-bar';
import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Platform, Alert, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native';
import styles from '../Styles/index.js';
import MyHeader from '../Components/Header.js'
import SantaAnimation from '../Components/SantaClaus.js';

export default class WelcomeScreen extends React.Component {
  constructor()
  {
    super();
    this.state = {
        email : '',
        password : '',
        firstName : '',
        lastName : '',
        address : '',
        contactNumber : '',
        confirmPassword : '',
        modalVisible : false,
    }
  }

  checkUserLogin = () => {
    var email = this.state.email;
    var password = this.state.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => 
    {
        this.props.navigation.navigate('Donate');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        return Alert.alert(errorMessage);
    })
  }

  showModal = () =>
  {
    var modalStatus = this.state.modalVisible; 

    return ( 
      <Modal visible = { modalStatus } animationType = { 'slide' } transparant = { true } >
        <View>
          <ScrollView style = {{ width : '100%' }}>
            <KeyboardAvoidingView style = { styles.KeyboardAvoidingView } >
              <MyHeader  title = { 'Registration ' } />
              <TextInput style = { styles.inputBox } placeholder = { 'First Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ firstName : data }) }}/>
              <TextInput style = { styles.inputBox } placeholder = { 'Last Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ lastName : data }) }} />
              <TextInput style = { styles.inputBox } placeholder = { 'Contact-Number' } maxLength = { 10 } keyboardType = { 'numeric' } onChangeText = {(data) => { this.setState({ contactNumber : data }) }} />
              <View style = { styles.inputBox }>
                <TextInput placeholder = { 'Address' } multiline = { true } onChangeText = {(data) => { this.setState({ address : data }) }} />
              </View>
              <TextInput style = { styles.inputBox } placeholder = { 'Email' } maxLength = { 30 } onChangeText = {(data) => { this.setState({ email : data }) }} value = { this.state.email }/>
              <TextInput style = { styles.inputBox } placeholder = { 'Password' } maxLength = { 30 } onChangeText = {(data) => { this.setState({ password : data }) }} value = { this.state.password }/>
              <TextInput style = { styles.inputBox } placeholder = { 'Confirm Password' } maxLength = { 30 } onChangeText = {(data) => { this.setState({ confirmPassword : data }) }} />
              <View>
                <View style = { styles.buttonWrapper }>
                  <TouchableOpacity style = { styles.button } onPress = {() => { this.signUpUser() }}>
                        <Text style = { styles.buttonText }>
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.button } onPress = {() => { this.setState({ 'modalVisible' : false}) }}>
                        <Text style = { styles.buttonText }>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  
  signUpUser = () => {
    var email = this.state.email;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var contactNumber = this.state.contactNumber;
    var address = this.state.address;

    if(password !== confirmPassword )
    {
      return Alert.alert(" Password Does Not Match ");
    }
    else
    {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => 
      {
          db.collection('users').add({
            firstName : firstName,
            lastName : lastName,
            fullName : firstName + " " + lastName,
            email : email,
            address : address,
            contact : contactNumber,
            isBookRequestActive : false,
          })

          if( Platform.OS === 'android' )
          {
            ToastAndroid.show("Welcome" + firstName + " " + lastName, ToastAndroid.SHORT );
          }
          else
          {
            return Alert.alert( "Welcome" + firstName + " " + lastName );
          }
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          return Alert.alert(errorMessage);
      })
    }
  }

  componentDidMount = () =>
  {
    this.setState({
      email : '',
      password : '',
      firstName : '',
      lastName : '',
      address : '',
      contactNumber : '',
      confirmPassword : '',
      modalVisible : false,
    })
  }

  render()
  {
    return (
      <View>
        <View>
          { this.showModal() }
        </View>
        {/* <MyHeader title = { 'Book Santa' } navigation = {this.props.navigation}/> */}
        {/* <SantaAnimation /> */}
        <View style = { styles.container }>
          <View style = { styles.buttonWrapper }>
              <TextInput style = { styles.inputBox } placeholder = { 'abc@example.com' } keyboardType = { 'email-address' } onChangeText = {(data) => { this.setState({ email : data })}}/>
              <TextInput style = { styles.inputBox } placeholder = { 'abcPassword' } secureTextEntry = { true } onChangeText = {(data) => { this.setState({ password : data })}}/>
              <TouchableOpacity style = {[ styles.button, { marginBottom : 20, margin : 20, } ]} onPress = {() => { this.checkUserLogin() }}>
                  <Text style = { styles.buttonText }>
                      Login
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style = { styles.button } onPress = {() => { this.setState({ modalVisible : true, }) }}>
                  <Text style = { styles.buttonText }>
                      Signup
                  </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
