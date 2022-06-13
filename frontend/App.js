import React from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import Route from './src/Navigation/Router';
import { AuthProvider } from './src/store/AuthContext';

const App = () => {
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
