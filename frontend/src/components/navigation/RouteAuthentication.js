import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, ForgotPassword } from '../../screen';
const AuthStack = createNativeStackNavigator();

const RouteAuthentication = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    
    </AuthStack.Navigator>
  );
}

export default RouteAuthentication