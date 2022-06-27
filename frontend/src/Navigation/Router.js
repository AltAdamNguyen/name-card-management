import React, { useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Splash} from '../screen';
import RouteMovingBetweenScreen from '../components/navigation/RouteMovingBetweenScreen';
import RouteAuthentication from '../components/navigation/RouteAuthentication';
import AuthContext from '../store/AuthContext';

// const getTabBarVisible = (route) => {
//   const state = useNavigationState(route => route);
//   const indexTab = state.routes[0].state ? state.routes[0].state.index : 0
//   if (indexTab == 0) {
//     return { height: '9%', borderTopColor: '#E0E3E3' }
//   }
//   return { display: 'none' }
// }



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
      {isLoading ? <Splash /> : (authCtx.isLogin ? <RouteMovingBetweenScreen /> : <RouteAuthentication />)}
    </NavigationContainer>
  );
}
export default Route;