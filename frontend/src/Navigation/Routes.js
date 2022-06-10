import React from 'react';
import { Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, GroupContact, Team, Setting, ScanScreen } from '../screen/';
import styles from './styles';

import icHome from '../asset/icon/home.png';
import icGroup from '../asset/icon/credit_card.png';
import icTeam from '../asset/icon/team.png';
import icSetting from '../asset/icon/setting.png';
import icCamera from '../asset/icon/camera.png';
import SignIn from '../screen/SignIn/SignIn';
import ForgotPassword from '../screen/ForgotPassword/ForgotPassword';
const Tab = createBottomTabNavigator();


const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='SignIn'
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

      <Tab.Screen name="SignIn"
          component={SignIn}
        />
       <Tab.Screen name="ForgotPassword"
          component={ForgotPassword}
        />
        <Tab.Screen name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={styles(focused).container}>
                  <Image
                    style={styles(focused).icon}
                    source={icHome}
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
                    source={icGroup}
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
                      source={icCamera}
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
                    source={icTeam}
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
                    source={icSetting}
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
    </NavigationContainer>
  );
};

export default Routes;