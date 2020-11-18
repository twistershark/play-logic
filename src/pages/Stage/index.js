import React from 'react';

import { 
  SafeAreaView, 
  Text 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

const Stage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.title}>Pagina de fases</Text>
    </SafeAreaView>
  );
};

export default Stage;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 120,
    color: '#000',
  },

});