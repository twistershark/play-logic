import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import Routes from './routes';

import { AuthProvider } from './hooks/auth';

const App = () => (

  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#538900" translucent />
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NavigationContainer>
);

export default App;
