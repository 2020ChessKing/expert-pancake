import { StatusBar } from 'expo-status-bar';
import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Platform, Alert, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native';
import styles from '../Styles/index.js';
import MyHeader from '../Components/Header.js'
import { ListItem } from 'react-native-elements';

export default class DonateScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allDonations : [],
            donarId : firebase.auth().currentUser.email,
            donarName : '',
        }

        this.dataToFetch = null;
    }

    getUserName = ( userId ) =>
    {
        db.collection('users').where('email', '==', userId).get()
        .then( snapshot => {
            snapshot.forEach( doc => {
                this.setState(
                    {
                        'donarName' : doc.data().firstName + ' ' + doc.data().lastName,
                    }
                )
            })
        } ) 
    }

    fetchData = () => {
        this.dataToFetch = db.collection('allDonations').where( 'donarId', '==', this.state.donarId )
            .onSnapshot( ( snapshot ) => {
                var allDonations = [];
                snapshot.docs.map((doc) => 
                {
                    var donation = doc.data();
                    donation["doc_id"] = doc.id;
                    allDonations.push( donation )
                });
                this.setState({
                    allDonations : allDonations,
                })
            })
    }

    componentDidMount = () => {
        this.getUserName( this.state.donarId );
        this.fetchData();
    }

    componentWillUnmount = () => {
        this.dataToFetch();
    }

    sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.requestId
        var donorId = bookDetails.donarId
        db.collection("allNotifications")
        .where("requestId","==", requestId)
        .where("donorId","==",donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var message = ""
            if(requestStatus === "book sent"){
              message = this.state.donorName + " sent you book"
            }else{
               message =  this.state.donorName  + " has shown interest in donating the book"
            }
            db.collection("AllNotifications").doc(doc.id).update({
              "message": message,
              "notificationStatus" : "unread",
              "date"  : firebase.firestore.FieldValue.serverTimestamp()
            })
          });
        })
      }
   

    sendBook = ( bookDetails ) => {
        if( bookDetails.requestStatus === "book sent"){
          var requestStatus = "Donor Interested"
          db.collection("allDonations").doc(bookDetails.doc_id).update({
            "requestStatus" : "Donor Interested"
          })
          this.sendNotification(bookDetails,requestStatus)
        }
        else{
          var requestStatus = "book sent"
          db.collection("allDonations").doc(bookDetails.doc_id).update({
            "requestStatus" : "book sent"
          })
            this.sendNotification(bookDetails,requestStatus)
        }
      }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key = { i }
                title = { item.bookName }
                subtitle = { 'Request By :' + item.requestBy + '\nstatus : ' + item.requestStatus }
                titleStyle = { { color : 'black', fontWeight : 'bold' } }
                bottomDivider = { true }
                rightElement = {
                    <TouchableOpacity style = {[ styles.button, { width : '15%', backgroundColor : item.requestStatus === "book sent" ? 'green' : 'red' } ]} onPress = {() => { this.sendBook(item) }}>
                        <Text style = {{ color: '#fff' }}>
                            { item.requestStatus === "book sent" ? "Book Donated" : "Send Book" }
                        </Text>
                    </TouchableOpacity>
                }
            />
        );
    }

    render() {
        return (
            <View>
                <MyHeader title = { "My Donations" } navigation = { this.props.navigation } />
                <View>
                    {
                        this.state.allDonations.length === 0
                            ?
                            (
                                <View>
                                    <Text>List of All Donated Books</Text>
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    data = { this.state.fetchedData }
                                    keyExtractor = { this.keyExtractor }
                                    renderItem = { this.renderItem }
                                /> 
                            )

                    }
                </View>
            </View>
        );
    }
}