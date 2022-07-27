import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RouteMovingBetweenScreen from '../components/navigation/RouteMovingBetweenScreen';
import RouteAuthentication from '../components/navigation/RouteAuthentication';
import AuthContext from '../store/AuthContext';

const Route = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.checkToken();
  }, []);
  
  return (
    <NavigationContainer>
      {authCtx.isLogin ? <RouteMovingBetweenScreen /> : <RouteAuthentication />}
    </NavigationContainer>
  );
}
export default Route;