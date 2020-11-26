import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { useNavigation } from '@react-navigation/native';

import Done from '../../assets/done.png';
import LockedPadlock from '../../assets/lockedPadlock.png';
import UnlockedPadlock from '../../assets/unlockedPadlock.png';

const StageBox = ({ id, status }) => {
  const [image, setImage] = useState(LockedPadlock);

  useEffect(() => {
    if (status === -1) {
      setImage(LockedPadlock);
    } else if (status === 0) {
      setImage(UnlockedPadlock);
    } else if (status > 0) {
      setImage(Done);
    }
  }, [status]);

  const navigation = useNavigation();

  const handleNavigation = useCallback(() => {
    if (status !== -1) {
      // navigation.navigate(`Stage${id}`);
      navigation.navigate('TestAnimation');
    }
  }, [id, navigation, status]);

  return (
    <View>
      <TouchableOpacity onPress={handleNavigation}>
        <View style={[styles.box, id % 2 === 0 ? { backgroundColor: '#FFE342' } : ' ']}>
          <Text style={styles.text}>{id}</Text>
          <View style={styles.status}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = EStyleSheet.create({
  box: {
    width: '6.2rem',
    height: '6.2rem',
    backgroundColor: '#592C15',
    borderRadius: '0.6rem',
    justifyContent: 'center',

  },
  text: {
    fontSize: '2rem',
    color: '#538900',
    alignSelf: 'center',
    paddingTop: '1rem',

  },
  status: {
    alignItems: 'flex-end',
    paddingRight: '0.5rem',
    paddingTop: '0.4rem',
  },
  image: {
    width: '1.2rem',
    height: '1.2rem',
  },
});

export default StageBox;
