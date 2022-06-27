import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContact, UpdateContact } from "../../screen"
const Stack = createNativeStackNavigator()

const RouteMovingBetweenHomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ViewContact" component={ViewContact} />
      <Stack.Screen name="UpdateContact" component={UpdateContact} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenHomeScreen