import React, { useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Splash} from '../screen';
import RouteMovingBetweenScreen from '../components/navigation/RouteMovingBetweenScreen';
import RouteAuthentication from '../components/navigation/RouteAuthentication';
import AuthContext from '../store/AuthContext';

const Route = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])


  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isLogin ? <RouteMovingBetweenScreen /> : <RouteAuthentication />}
    </NavigationContainer>
  );
}
export default Route;