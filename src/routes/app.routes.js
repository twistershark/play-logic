import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Stage from '../pages/Stage'
import Profile from '../pages/Profile';

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
    <App.Screen name="Stage" component={Stage} />
  </App.Navigator>
);

export default AppRoutes;
