import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, GroupContact, Team, Setting, ScanScreen, ForgotPassword, SignIn, Splash, ViewContact,ChangePassword } from '../screen';
import styles from './styles';

import iconPath from '../constants/iconPath';
import AuthContext from '../store/AuthContext';

const Stack = createNativeStackNavigator()

const getTabBarVisible = (route) => {
  const state = useNavigationState(route => route);
  const indexTab = state.routes[0].state ? state.routes[0].state.index : 0
  if (indexTab == 0) {
    return { height: '9%', borderTopColor: '#E0E3E3' }
  }
  return { display: 'none' }
}

const RouteMovingBetweenScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewContact"
        component={ViewContact}
      />
    </Stack.Navigator>
  )

}

const Tab = createBottomTabNavigator();


const RouteNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
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
      <Tab.Screen name="HomeScreen"
        component={RouteMovingBetweenScreen}
        options={({ route }) => ({
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
          tabBarStyle: getTabBarVisible(route)
        })}
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
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
    </AuthStack.Navigator>
  );
}

const Route = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])


  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoading ? <Splash /> : (authCtx.isLogin ? <RouteNavigation /> : <RouteAuthentication />)}

    </NavigationContainer>
  );
}
export default Route;