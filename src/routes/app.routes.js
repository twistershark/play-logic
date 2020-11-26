import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

import Profile from '../pages/Profile';

import Stages from '../pages/Stages';

import Stage1 from '../pages/Stage1';

import Stage2 from '../pages/Stage2';

import Stage3 from '../pages/Stage3';

import TestAnimation from '../pages/TestAnimation';

const App = createStackNavigator();

const AppRoutes = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#538900' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="Stages" component={Stages} />
    <App.Screen name="Stage1" component={Stage1} />
    <App.Screen name="Stage2" component={Stage2} />
    <App.Screen name="Stage3" component={Stage3} />
    <App.Screen name="TestAnimation" component={TestAnimation} />

  </App.Navigator>
);

export default AppRoutes;
