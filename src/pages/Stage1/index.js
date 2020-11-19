import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import EStyleSheet from 'react-native-extended-stylesheet';
import backArrow from '../../assets/backarrow.png';

const Stage1 = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <TouchableOpacity style={styles.backNavigation} onPress={() => navigation.goBack()}>
          <Image source={backArrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Bem vindo à Fase 1</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  backNavigation: {
    marginTop: '2rem',
    marginLeft: '0.75rem',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Stage1;
