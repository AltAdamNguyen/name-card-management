import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContact, UpdateContact } from "../../screen"
import RouteNavigation from './RouteBottom';
import RouteMovingBetweenScanScreen from './RouteMovingBetweenScanScren';
import RouteMovingBetweenTeamScreen from './RouteMovingBetweenTeamScreen';
import RouteMovingBetweenHomeScreen from './RouteMovingBetwwenHomeScreen';
import RouteMovingBetweenGroupScreen from './RouteMovingBetweenGroupContactScreen';
import RouteMovingBetweenSettingScreen from './RouteMovingBetweenSettingScreen';
const Stack = createNativeStackNavigator()

const RouteMovingBetweenScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName='Bottom'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bottom" component={RouteNavigation} />
      <Stack.Screen name="SettingSwap" component={RouteMovingBetweenSettingScreen} />
      <Stack.Screen name="HomeSwap" component={RouteMovingBetweenHomeScreen} />
      <Stack.Screen name="TeamSwap" component={RouteMovingBetweenTeamScreen} />
      <Stack.Screen name="GroupSwap" component={RouteMovingBetweenGroupScreen} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenScreen