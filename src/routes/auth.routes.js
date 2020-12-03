import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import OnBoarding from '../pages/OnBoarding';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [initiliazing, setInitializing] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@PlayLogic:alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('@PlayLogic:alreadyLaunched', 'true');
        setIsFirstLaunch(true);
        setInitializing(false);
      } else {
        setIsFirstLaunch(false);
        setInitializing(false);
      }
    });
  }, []);

  if (initiliazing === true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  if (isFirstLaunch === true) {
    return (
      <Auth.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#538900' },
        }}
      >
        <Auth.Screen name="OnBoarding" component={OnBoarding} />
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />

      </Auth.Navigator>
    );
  }
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#538900' },
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />

    </Auth.Navigator>
  );
};

export default AuthRoutes;
