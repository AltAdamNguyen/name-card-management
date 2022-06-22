import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScanScreen, Home } from '../../screen';
// import SkeletonAddContact from '../Skeleton/LoadingScan';
// import SkeletonAddContact from '../skeleton/addContact/SkeletonAddContact';
import LoadingScan from '../skeleton/addContact/LoadingScan';
const ScanStack = createNativeStackNavigator()

const RouteMovingBetweenScanScreen = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ScanStack.Screen name="Scan" component={ScanScreen} />
      <ScanStack.Screen name="AddContact" component={LoadingScan} />
      {/* <ScanScreen.Screen name="Home" component={Home} /> */}
    </ScanStack.Navigator>
  )
}

export default RouteMovingBetweenScanScreen