import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DonateScreen from '../Screens/Donate.js';
import { StackNavigator } from '../Components/stackNavigator';
import RequestScreen from '../Screens/Request.js';


export const TabNavigtor = createBottomTabNavigator({
    Donate :  { 
        screen : StackNavigator,
        navigationOptions : {
            tabBarIcon : <Image  source  = { require('../assets/request-list.png') } style = {{ width : 15, height : 15, }} />,
            tabBarLabel : 'Donate Books',
        }
    },
    Request :  { 
        screen : RequestScreen,
        navigationOptions : {
            tabBarIcon : <Image  source  = { require('../assets/request-book.png') } style = {{ width : 15, height : 15, }} />,
            tabBarLabel : 'Rquest Books',
        }
    },
})