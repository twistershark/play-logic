import React, { useCallback, useEffect } from 'react';
import { GoogleSignin } from '@react-native-community/google-signin';

import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const {
    user, setUser, initializing, setInitializing,
  } = useAuth();

  const onAuthStateChanged = useCallback((u) => {
    setUser(u);

    if (initializing) setInitializing(false);
  }, [initializing, setUser, setInitializing]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '868242068523-74kv858m3aaikst639vmd1gkv3dls7et.apps.googleusercontent.com',
    });
  }, [onAuthStateChanged]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
