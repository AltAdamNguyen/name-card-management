import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn, ForgotPassword , ResetPasswordCode, ResetPassword} from '../../screen';
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
      <AuthStack.Screen name="ResetPasswordCode" component={ResetPasswordCode} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
}

export default RouteAuthentication