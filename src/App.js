import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SplashScreen from 'react-native-splash-screen';

import { StatusBar } from 'react-native';
import Routes from './routes';

import { AuthProvider } from './hooks/auth';
import { ActionProvider } from './hooks/actions';

const App = () => {
  EStyleSheet.build();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#538900" translucent />
      <AuthProvider>
        <ActionProvider>
          <Routes />
        </ActionProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
