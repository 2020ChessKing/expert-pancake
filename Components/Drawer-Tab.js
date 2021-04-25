import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { TabNavigtor } from './App-Tab.js';
import SideBar from './SideBar.js';
import Settings from '../Screens/Profile.js';
import MyDonations from '../Screens/MyDonations.js';
import MyNoticfications from "../Screens/MyNotifications"

export const DrawerNavigator = createDrawerNavigator(
    {
        Home : {
            screen : TabNavigtor,
        },

        Settings : {
            screen : Settings,
        },

        MyDonations : {
            screen : MyDonations,
        },

        MyNotifications : {
            screen : MyNoticfications,
        }
    }, 
    {
        contentComponent : SideBar,
    },
    {
        initialRouteName : 'Home',
    }
)