import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContact, UpdateContact } from "../../screen"
import RouteNavigation from './RouteBottom';
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
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenScreen