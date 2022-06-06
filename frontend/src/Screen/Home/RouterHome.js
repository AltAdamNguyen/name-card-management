import React, { useState } from 'react';
import Home from './Home';
import ViewContact from '../ViewContact/ViewContact';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="HomeScreen" component={Home} />
            <HomeStack.Screen
                name="ViewContactScreen"
                component={ViewContact}
                options={{ tabBarStyle: { display: 'none' } }}
            />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;