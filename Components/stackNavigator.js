import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ViewReciever from '../Screens/ViewReciever.js';
import DonateScreen from '../Screens/Donate.js'

export const StackNavigator = createStackNavigator(
    {
        DonateScreen: { screen: DonateScreen, 
                        navigationOptions : { headerShown : false, } 
                      },
        ViewReciever: { screen: ViewReciever,                      
                        navigationOptions : { headerShown : false, } 
                      },
    },
    {
        initialRouteName: 'DonateScreen',
    }
)