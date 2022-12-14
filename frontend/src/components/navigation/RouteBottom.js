import { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GroupContact, Team, Setting, Home } from '../../screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../navigation/styles';
import AuthContext from '../../store/AuthContext';
import RouteMovingBetweenScanScreen from './RouteMovingBetweenScanScren';
import { useTranslation } from 'react-i18next';
const Tab = createBottomTabNavigator();

const RouteNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={authCtx.role === 3 ? "TeamScreen" : "HomeScreen"}
      
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: 80,
          ...styles(false).shadow
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {authCtx.role !== 3 && <Tab.Screen name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon name="home" size={26} color={focused ? '#1890FF' : '#828282'} />
                <Text style={styles(focused).label}>
                  {t("Navigation_Bottom_Home")}
                </Text>
              </View>
            )
          },
        }}
      />}
      <Tab.Screen name="GroupContact"
        component={GroupContact}
        independent={true}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon name="credit-card-multiple" size={26} color={focused ? '#1890FF' : '#828282'} />
                <Text style={styles(focused).label}>
                  {t("Navigation_Bottom_Group")}
                </Text>
              </View>
            )
          }
        }}
      />
      {authCtx.role !== 3 && <Tab.Screen name="ScanScreen"
        component={RouteMovingBetweenScanScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={[styles(focused).containerScan, styles(focused).shadow]}>
                <Icon name="credit-card-scan" size={30} color='#fff' />
              </View>
            )
          },
          tabBarStyle: { display: 'none' }
        }}
      />}
      <Tab.Screen name="TeamScreen"
        component={Team}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon name="account-group" size={26} color={focused ? '#1890FF' : '#828282'} />
                <Text style={styles(focused).label}>
                  {t("Navigation_Bottom_Team")}
                </Text>
              </View>
            )
          },

        }}
      />
      <Tab.Screen name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon name="cog" size={26} color={focused ? '#1890FF' : '#828282'} />
                <Text style={styles(focused).label}>
                  {t("Navigation_Bottom_Setting")}
                </Text>
              </View>
            )
          },

        }}
      />
    </Tab.Navigator>
  );
};

export default RouteNavigation;