import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackScreen, GroupContact, Team, Setting, ScanScreen, ForgotPassword, SignIn, Splash } from '../screen';
import styles from './styles';

import iconPath from '../constants/iconPath';
import AuthContext from '../store/AuthContext';

const Tab = createBottomTabNavigator();

const RouteNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: '9%',
          borderTopColor: '#E0E3E3',
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Image
                  style={styles(focused).icon}
                  source={iconPath.icHome}
                />
                <Text style={styles(focused).label}>
                  Trang chủ
                </Text>
              </View>

            )
          },

        }}
      />
      <Tab.Screen name="Group Contact"
        component={GroupContact}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Image
                  style={styles(focused).icon}
                  source={iconPath.icGroup}
                />
                <Text style={styles(focused).label}>
                  Nhóm
                </Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).containerScan}>
                <Image
                  style={styles(focused).iconScan}
                  source={iconPath.icCamera}
                />
                <Text style={styles(focused).labelScan}>
                  Quét
                </Text>
              </View>
            )
          },
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tab.Screen name="Team"
        component={Team}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Image
                  style={styles(focused).icon}
                  source={iconPath.icTeam}
                />
                <Text style={styles(focused).label}>
                  Đội
                </Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Image
                  style={styles(focused).icon}
                  source={iconPath.icSetting}
                />
                <Text style={styles(focused).label}>
                  Cài đặt
                </Text>
              </View>
            )
          },

        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();

const RouteAuthentication = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
}

const Route = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])


  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoading ? <Splash /> : (authCtx.isLogin ? <RouteNavigation /> : <RouteAuthentication />)}

    </NavigationContainer>
  );
}
export default Route;