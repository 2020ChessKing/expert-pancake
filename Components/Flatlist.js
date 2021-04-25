import React from 'react';
import db from '../config.js';
import firebase from 'firebase';
import { StyleSheet, Text, View, TextInput, Dimensions, Animated, TouchableOpacity, ScrollView, FlatList, Platform, Alert, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native';
import { Card, Header, Icon, ListItem } from 'react-native-elements';
import { SwipeListView } from "react-native-swipe-list-view";

export default class SFlatlist extends React.Component
{
    constructor( props )
    {
        super(props);
        this.state = {
            "allNotifications" : this.props.allNotifications,
        }
    }

    renderItem = data =>
    {
        return(
            < Animated.View >
                <ListItem 
                    leftElement = { <Icon name = "book" type = "font-awesome" color = "#696969" /> }
                    title = { data.item.book_name }
                    titleStyle = {{ color: "black", fontWeight: "bold" }}
                    subtitle = { data.item.message }
                    bottomDivider
                />
            </Animated.View>
        );
    }

    updateMarkAsread = notification => {
        db.collection("allNotifications")
          .doc(notification.doc_id)
          .update({
            notificationStatus: "read"
          });
      };

    renderHiddenItem = () => (
        <View style={styles.rowBack}>
          <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <Text style={styles.backTextWhite}>Mark as read</Text>
          </View>
        </View>
    );
    
    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifications;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
          const newData = [...allNotifications];
          this.updateMarkAsread(allNotifications[key]);
          newData.splice(key, 1);
          this.setState({ allNotifications: newData });
        }
      };    

    render()
    {
        return(
            <View style = { styles.container }>
                <SwipeListView
                    disableRightSwipe = { true }
                    data = { this.state.allNotifications }
                    renderItem = { this.renderItem }
                    renderHiddenItem = { this.renderHiddenItem }
                    rightOpenValue = { -Dimensions.get("window").width }     
                    previewRowKey={ "0" }
                    previewOpenValue = { -40 }
                    previewOpenDelay = { 3000 }
                    onSwipeValueChange = { this.onSwipeValueChange }
                    keyExtractor = { (item, index) => index.toString() }           
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    backTextWhite: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "flex-start"
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#29b6f6",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 100
    },
    backRightBtnRight: {
      backgroundColor: "#29b6f6",
      right: 0
    }
  });