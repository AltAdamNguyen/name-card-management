import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Team  } from '../../screen';
const TeamStack = createNativeStackNavigator()

const RouteMovingBetweenTeamScreen = () => {
  return (
    <TeamStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TeamStack.Screen name="Team" component={Team} />
    </TeamStack.Navigator>
  )
}

export default RouteMovingBetweenTeamScreen