import React from 'react';
import firebase from 'firebase';
import { View, TouchableOpacity, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import styles from '../Styles/index.js';
import { DrawerItems } from 'react-navigation-drawer';
import db from '../config.js';

export default class SideBar extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            image : '#',
            fullName : '',
            // "DocId" : '',
        }
    }

    getUserProfile = () =>
    {
        db.collection('users').where("email", "==", this.state.userId).onSnapshot(( snapshot ) =>
        {
            snapshot.forEach(( doc ) =>
            {
                this.setState({
                    "fullName" : doc.data().fullName,
                })
            })
        })
    }

    openImageLibrary123 = async () =>
    {
        console.log("inside openImageLibrary ")
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 1,
        })

        if( !cancelled )
        {
            this.uploadImage( uri, this.state.userId )
        }
    }

    uploadImage = async ( uri, imageName ) =>
    {
        var response = await fetch( uri )
        var blob = await response.blob();
        var ref = firebase.storage().ref().child('ProfilePics/' + imageName);

        return ref.put( blob ).then(( response ) => 
        {
            this.fetchImage( imageName )
        })
    }

    fetchImage = ( imageName ) =>
    {
        var ref = firebase.storage().ref().child('ProfilePicstest/' + imageName)
        ref.getDownloadURL().then(( url ) =>
        {
            this.setState({
                "image" : url
            })
            .catch(( error ) => {
                this.setState({
                    "image" : '#',
                })
            })
        })
    }

    componentDidMount = () =>
    {
        this.fetchImage( this.state.userId );
        this.getUserProfile();
    }
    
    render()
    {
        return(
            <View>
                <View >
                    <View>
                        <Avatar 
                            rounded
                            source = {
                                {
                                    uri : this.state.image,
                                }
                            }
                            size = "large"
                            onPress = {() =>this.openImageLibrary123()}
                            
                            showEditButton
                        />
                    </View>
                    <DrawerItems {... this.props} />
                </View>
                <View >
                    <TouchableOpacity onPress = {() => { 
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

