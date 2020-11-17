import React from 'react';

import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.logout} onPress={() => logout()}>
        <Text style={styles.logoutText}>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 120,
    color: '#000',
  },

  logout: {
    marginTop: 80,
    backgroundColor: 'red',
  },

  logoutText: {
    color: '#fff',
    fontSize: 50,
  },
});
