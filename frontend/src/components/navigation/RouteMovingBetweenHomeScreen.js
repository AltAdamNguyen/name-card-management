import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, ViewContact } from "../../screen"
const HomeStack = createNativeStackNavigator()

const RouteMovingBetweenHomeScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ViewContact" component={ViewContact} />
    </HomeStack.Navigator>
  )
}

export default RouteMovingBetweenHomeScreen