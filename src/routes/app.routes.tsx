import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{headerTitleAlign: 'center'}} >
    <App.Screen name="Dashboard" component={Dashboard} options={{
      headerShown: false,
    }} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;