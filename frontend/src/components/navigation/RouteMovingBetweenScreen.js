import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContact, UpdateContact } from "../../screen"
import RouteNavigation from './RouteBottom';
import RouteMovingBetweenScanScreen from './RouteMovingBetweenScanScren';
import RouteMovingBetweenTeamScreen from './RouteMovingBetweenTeamScreen';
import RouteMovingBetweenHomeScreen from './RouteMovingBetwwenHomeScreen';
const Stack = createNativeStackNavigator()

const RouteMovingBetweenScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={RouteNavigation} />
      <Stack.Screen name="HomeSwap" component={RouteMovingBetweenHomeScreen} />
      <Stack.Screen name="TeamSwap" component={RouteMovingBetweenTeamScreen} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenScreen