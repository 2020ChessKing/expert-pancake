import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Platform, Alert, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native';
import styles from '../Styles/index.js';
import { Card, Header, Icon } from 'react-native-elements';

class ViewReciever extends React.Component 
{
    constructor( props )
    {
        super( props );
        this.state = {
            userId : firebase.auth().currentUser.email,
            recieverId : this.props.navigation.getParam('details')[ 'UserID' ],
            requestId : this.props.navigation.getParam('details')[ 'RequestID' ],
            requestReason : this.props.navigation.getParam('details')[ 'RequestReason' ],
            bookName : this.props.navigation.getParam('details')[ 'BookName' ],
            recieverAddress : '',
            recieverName : '',
            recieverContact : '',
            recieverDocId : '',
            userName : '',
        }
    }

    getDetails = () =>
    {
        db.collection('users').where("email", "==", this.state.recieverId).get()
        .then( snapshot => 
        {
            snapshot.forEach( doc => {
                this.setState({
                    recieverAddress : doc.data().address,
                    recieverName : doc.data().firstName + ' ' + doc.data().lastName,
                    recieverContact : doc.data().contact,
                })
            })
        })

        db.collection('requestedBooks').where("RequestID", "==", this.state.recieverId).get()
        .then( snapshot => 
        {
            snapshot.forEach( doc => {
                this.setState({
                    recieverDocId : doc.id,
                })
            })
        })
    }

    addNotification = () =>
    {
        var message = this.state.userName + ' has shown interest in donating ' + this.state.bookName;
        db.collection('allNotifications').add({
            'targetedUserId' : this.state.recieverId,
            'donorId' : this.state.userId,
            'requestId' : this.state.requestId, 
            'booName' : this.state.bookName,
            'notificationStatus' : 'unread',
            'date' : firebase.firestore.FieldValue.serverTimestamp(),
            'message' : message,
        })
    }

    getUserName = ( userId ) =>
    {
        db.collection('users').where('email', '==', userId).get()
        .then( snapshot => {
            snapshot.forEach( doc => {
                this.setState(
                    {
                        'userName' : doc.data().firstName + ' ' + doc.data().lastName,
                    }
                )
            })
        } ) 
    }

    componentDidMount()
    {
        this.getDetails();
        this.getUserName( this.state.userId );
    }

    updateBookStatus = () =>
    {
        db.collection('allDonations').add({
            'bookName' : this.state.bookName,
            'requestId' : this.state.requestId,
            'donarId' : this.state.userId,
            'requestedBy' : this.state.recieverName,
            'requestStatus' : 'Donor Intrested',
        })
    }

    render()
    {
        return(
            <View style = { styles.container }>
                <View style = {{ flex : 0.1 }}>
                    <Header leftComponent = { <Icon name = 'arrow-left' type = 'feather' color = '#696969' onPress = {() => this.props.navigation.goBack()}/>} 
                            centerComponent = { { text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } } } backgroundColor = "#eaf8fe" 
                    />
                </View>
                <View style = {{ flex : 0.3, }}>
                    <Card title = { ' Book Information ' } titleStyle = { { fontSize : 20, } }>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Name : { this.state.bookName } </Text>
                        </Card>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Reason : { this.state.requestReason } </Text>
                        </Card>
                    </Card>                    
                    <Card title = { 'Reciever Information ' } titleStyle = { { fontSize : 20, } }>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Name : { this.state.recieverName } </Text>
                        </Card>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Contact : { this.state.recieverContact } </Text>
                        </Card>                        
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Address : { this.state.recieverAddress    } </Text>
                        </Card>                        
                    </Card>
                </View>
                <View>
                    {
                        this.state.recieverId !== this.state.userId 
                        ? (
                            <TouchableOpacity style = { styles.button } 
                                onPress={() => { 
                                    this.updateBookStatus();
                                    this.addNotification();
                                    this.props.navigation.navigate('MyDonations');
                                }}>
                                <Text style={{ color: '#fff' }}>
                                    I Want to Donate
                                </Text>
                            </TouchableOpacity>
                        )
                        : (
                            null
                        )
                    }
                </View>
            </View>
        );
    }
}


export default ViewReciever;



