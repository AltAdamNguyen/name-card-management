import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Setting, ChangePassword } from "../../screen"
const Stack = createNativeStackNavigator()

const RouteMovingBetweenSettingScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  )
}

export default RouteMovingBetweenSettingScreen