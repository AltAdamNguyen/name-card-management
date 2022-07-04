import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Team, ViewContactMember  } from '../../screen';
const TeamStack = createNativeStackNavigator()

const RouteMovingBetweenTeamScreen = () => {
  return (
    <TeamStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TeamStack.Screen name="ViewContactMember" component={ViewContactMember} />
    </TeamStack.Navigator>
  )
}

export default RouteMovingBetweenTeamScreen