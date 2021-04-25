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
            fetchedData: [],
        }

        this.dataToFetch = null;
    }

    fetchData = async () => {
        this.dataToFetch = db.collection('requestedBooks')
            .onSnapshot((snapshot) => {
                var requestBooksList = snapshot.docs.map((doc) => doc.data());
                this.setState({
                    fetchedData: requestBooksList,
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
                title ={ item.BookName }
                subtitle = { item.requestReason }
                titleStyle = { styles.listTitleStyles }
                bottomDivider={true}
                rightElement={
                    <TouchableOpacity style = {[ styles.button , { width : '20%', }]} 
                    onPress={() => { 
                        // console.log('view presed')
                        this.props.navigation.navigate('ViewReciever', { 'details' : item, }) 
                        }}>
                        <Text style={{ color: '#fff' }}>
                            View
                        </Text>
                    </TouchableOpacity>
                }
            />
        );
    }

    render() {
        return (
            <View>
                <MyHeader title = { "Donate" } navigation = { this.props.navigation } />
                <View>
                    {
                        this.state.fetchedData.length === 0
                            ?
                            (
                                <View>
                                    <Text>List of All Requested Books</Text>
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    data={this.state.fetchedData}
                                    keyExtractor={this.keyExtractor}
                                    renderItem={this.renderItem}
                                />
                            )

                    }
                </View>
            </View>
        );
    }
}