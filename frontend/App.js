import React from 'react';
import { SafeAreaView, Text, View, StatusBar, LogBox } from 'react-native';
import Route from './src/navigation/Router';
import { GroupContactDetail } from './src/screen';
import { AuthProvider } from './src/store/AuthContext';

const App = () => {
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar backgroundColor="#1890FF" />
        <Route />
      </AuthProvider>
    </SafeAreaView>
   );
};


export default App;
