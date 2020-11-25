import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Stage from '../../components/Stage'
import { View } from 'react-native';

const Stage1 = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Stage/>   
    </View>
    
  );
};

export default Stage1;
