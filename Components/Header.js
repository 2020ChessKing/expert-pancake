import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import db from "../config.js";
import firebase from 'firebase';


export default class MyHeader extends React.Component
{

  constructor( props )
  {
    super( props );
    this.state = {
      value : 0,
      // userId : firebase.auth().currentUser.email,
    }
  }

  getNotifications = () =>
  {
     db.collection("allNotifications").where("notificationStatus", "==", "unread")
    //  .where("targetedUserId", "==", this.state.userId)
     .onSnapshot(( snapshot ) => {
        var unread = snapshot.docs.map(( doc ) => doc.data() );
        this.setState({
          value : unread.length,
        })
     })
  }

  componentDidMount()
  {
    this.getNotifications();
  }

  render()
  {
    return (
      <View>
        <Header
            backgroundColor = { "#de1738" }
            centerComponent = {
              <View style = {{ flexDirection  : 'row'}}>
                <Text style = {{color : 'white', fontSize : 25, }}>{ this.props.title }</Text>
              </View>
            }

            leftComponent = {
              <Icon 
                name = "bars"
                type = "font-awesome"
                color = "#fff"
                onPress = {() => { this.props.navigation.toggleDrawer() }}
              />
            }

            rightComponent = {
              <View>
                <Icon 
                  name = "bell"
                  type = "font-awesome"
                  color = "#fff"
                  onPress = {() => { this.props.navigation.navigate( "MyNotifications" ) }}
                />
                
                <Badge 
                  value = { this.state.value }
                  containerStyle = {{ position : "absolute", top : -4, right : -4  }}
                />
              </View>
            }
        />
      </View>
    );
  }
}

