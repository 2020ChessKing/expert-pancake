import { StatusBar } from 'expo-status-bar';
import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Platform, Alert, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native';
import styles from '../Styles/index.js';
import MyHeader from '../Components/Header.js'
import { ListItem, Icon } from 'react-native-elements';
import SFlatlist from "../Components/Flatlist.js"

export default class MyNoticfications extends React.Component {
    constructor() {
        super();
        this.state = {
            fetchedData: [],
            userId : firebase.auth().currentUser.email,
        }

        this.dataToFetch = null;
    }

    fetchData = async () => {
        db.collection("allNotifications").where("notificationStatus", "==", "unread").where("targetedUserId", "==", this.state.userId).onSnapshot(( snapshot ) => 
        {
            var notifications = [];
            snapshot.docs.map((doc) => { 
                var notif = doc.data();
                notif["doc_id"] = doc.id;
                notifications.push( notif )
            });
            this.setState({
                fetchedData: notifications,
            })
        })
    }

    componentDidMount = () => {
        this.fetchData();
    }

    componentWillUnmount = () => {
        this.dataToFetch();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key = { i }
                title ={ item.booName }
                subtitle = { item.message }
                titleStyle = { styles.listTitleStyles }
                bottomDivider={true}
                leftElement = {
                    <Icon
                        name = "book"
                        type = "font-awesome"
                        color = "#ff"
                    />
                }
            />
        );
    }

    render() {
        return (
            <View>
                <MyHeader title = { "My Notifications" } navigation = { this.props.navigation } />
                <View>
                    {
                        this.state.fetchedData.length === 0
                            ?
                            (
                                <View>
                                    <Text>You have no notifications</Text>
                                </View>
                            )
                            :
                            (
                                <SFlatlist allNotifications = { this.state.fetchedData }/>
                            )

                    }
                </View>
            </View>
        );
    }
}