import React from 'react';

import { 
  SafeAreaView, 
  Text, 
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import backArrow from '../../assets/backarrow.png';

const Stage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
      <TouchableOpacity style={styles.backNavigation} onPress={() => navigation.goBack()}>
        <Image source={backArrow} />
      </TouchableOpacity>
      </View>
      <View>
        
      </View>
    </SafeAreaView>
  );
};

export default Stage;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 120,
    color: '#000',
  },

});