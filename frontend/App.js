import React from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import Route from './src/Navigation/Router';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#1890FF"/>
      <Route />
    </SafeAreaView>
  );
};


export default App;
