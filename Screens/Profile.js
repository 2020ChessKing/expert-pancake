import React, { Component } from 'react';
import { TouchableOpacity, View, TextInput, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import styles from '../Styles'
import MyHeader from '../Components/Header.js';

export default class Settings extends React.Component 
{
    constructor()
    {
        super();
        this.state = {
            email : firebase.auth().currentUser.email,
            firstName : '',
            lastName : '',
            address : '',
            contactNumber : '',
            docId : '',
        }
    }

        getInfo = () =>
        {
            var email = firebase.auth().currentUser.email;
            db.collection('users').where("email", '==', email).get()
            .then(snapshot => { snapshot.forEach(doc => { 
                var data = doc.data();
                this.setState({
                    email : data.email,
                    firstName : data.firstName,
                    lastName : data.lastName,
                    address : data.address,
                    contactNumber : data.contact,
                    docId : doc.id,
                })
            }) })

        }

        updateUser = () =>
        {
            db.collection('users').doc( this.state.docId ).update({
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                fullName : this.state.firstName + " " + this.state.lastName,
                address : this.state.address,
                contact : this.state.contactNumber,
              })
        }


        componentDidMount = () =>
        {
            this.getInfo();
        }

        render()
        {
            return(
                <View style = { styles.container}>
                    <MyHeader title = { "Settings" }/>
                        <View style = { styles.formWrapper }>
                        <TextInput style = { styles.inputBox } placeholder = { 'First Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ firstName : data }) }} value = { this.state.firstName }/>
                        <TextInput style = { styles.inputBox } placeholder = { 'Last Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ lastName : data }) }} value = { this.state.lastName }/>
                        <TextInput style = { styles.inputBox } placeholder = { 'Contact-Number' } maxLength = { 10 } keyboardType = { 'numeric' } onChangeText = {(data) => { this.setState({ contactNumber : data }) }} value = { this.state.contactNumber }/>
                        <View style = { styles.inputBox }>
                            <TextInput placeholder = { 'Address' } multiline = { true } onChangeText = {(data) => { this.setState({ address : data }) }} value = { this.state.address }/>
                        </View>
                        <View>
                            <View style = { styles.buttonWrapper }>
                                <TouchableOpacity style = { styles.button } onPress = {() => { this.updateUser() }}>
                                    <Text style = { styles.buttonText }>
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
