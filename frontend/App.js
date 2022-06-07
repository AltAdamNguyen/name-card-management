import React from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#1890FF"/>
      <Routes />
    </SafeAreaView>
  );
};


export default App;
