import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GroupContact, GroupContactDetail, AddContactToGroup } from "../../screen"
const Stack = createNativeStackNavigator()

const RouteMovingBetweenGroupContactScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name="GroupContact" component={GroupContact} />
      <Stack.Screen name="GroupContactDetail" component={GroupContactDetail} />
      <Stack.Screen name="AddContactToGroup" component={AddContactToGroup} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenGroupContactScreen