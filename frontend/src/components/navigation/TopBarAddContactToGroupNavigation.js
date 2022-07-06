import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator();

const MyTabs = (props) => {
    return (
        <Tab.Navigator
            initialRouteName="Hai">
            <Tab.Screen
                name="My Contact"
                component={props.allTab[0]}
                options={{ tabLabel: 'Tab 1' }}
            />
            <Tab.Screen
                name="Employee Contact"
                component={props.allTab[1]}
                options={{ tabLabel: 'Tab 2' }}
            />
        </Tab.Navigator>
    );
}

export default function TopBarNavigator(props) {
    return (
        <MyTabs allTab={props.allTab} />
    )
}
