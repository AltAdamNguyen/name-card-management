import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GroupContact, Team, Setting, Home} from '../../screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../navigation/styles';
import RouteMovingBetweenScanScreen from './RouteMovingBetweenScanScren';
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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).container}>
                <Icon name="home-outline" size={30} color={focused ? '#1890FF' : '#828282'} />
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
                <Icon name="credit-card-multiple-outline" size={30} color={focused ? '#1890FF' : '#828282'} />
                <Text style={styles(focused).label}>
                  Nhóm
                </Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="ScanScreen"
        component={RouteMovingBetweenScanScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles(focused).containerScan}>
                <Icon name="camera-outline" size={30} color='#fff' />
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
                <Icon name="account-group-outline" size={30} color={focused ? '#1890FF' : '#828282'} />
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
                <Icon name="cog-outline" size={30} color={focused ? '#1890FF' : '#828282'} />
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

export default RouteNavigation;