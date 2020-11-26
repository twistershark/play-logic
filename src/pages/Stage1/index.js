import React, { useCallback } from 'react';
import { View } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Stage from '../../components/Stage';
import { useAuth } from '../../hooks/auth';

import backArrow from '../../assets/backarrow.png';

const Stage1 = () => {
  const { handleScoreUpdate } = useAuth();
  // const navigation = useNavigation();

  const updateScore = useCallback(() => {
    handleScoreUpdate(2, 3);
  }, [handleScoreUpdate]);
  return (
    <View>
      <Stage />
    </View>
  );
};

export default Stage1;
