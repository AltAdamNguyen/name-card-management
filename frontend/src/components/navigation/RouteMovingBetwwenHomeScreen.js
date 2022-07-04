import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContact, UpdateContact, SearchContact, GroupContactDetail } from "../../screen"
const Stack = createNativeStackNavigator()

const RouteMovingBetweenHomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name="ViewContact" component={ViewContact} />
      <Stack.Screen name="UpdateContact" component={UpdateContact} />
      <Stack.Screen name="SearchContact" component={SearchContact} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenHomeScreen