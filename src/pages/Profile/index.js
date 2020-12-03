import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Orientation from 'react-native-orientation-locker';

import { useNavigation } from '@react-navigation/native';
import backArrow from '../../assets/backarrow.png';
import hungryMokey from '../../assets/personagens/macaco/Macaco_1star.png';
import mokey from '../../assets/personagens/macaco/Macaco_2star.png';
import fullerMokey from '../../assets/personagens/macaco/Macaco_3star.png';

import { useAuth } from '../../hooks/auth';

import ScoreList from '../../components/ScoreList';

const Profile = () => {
  const {
    user, logout, score1, score2, score3,
  } = useAuth();

  const userName = user.email.split('@');
  const [image, setImage] = useState(hungryMokey);

  const score = [
    { key: '1', star: score1 },
    { key: '2', star: score2 },
    { key: '3', star: score3 },
  ];

  useEffect(() => {
    if (score3 > 0) {
      setImage(fullerMokey);
    } else if (score2 > 0) {
      setImage(mokey);
    } else {
      setImage(hungryMokey);
    }
  }, [score1, score2, score3]);

  const navigation = useNavigation();

  Orientation.lockToPortrait();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backNavigation} onPress={() => navigation.goBack()}>
        <Image source={backArrow} />
      </TouchableOpacity>
      <View style={styles.profileView}>
        <View style={styles.profileImage}>
          <Image style={styles.userImage} source={image} />
        </View>
        <View style={{ marginVertical: 2 }}>
          <Text style={styles.userName}>{userName[0]}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.textOptions}>{ user ? 'Logout' : 'Login' }</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.score}>
        <ScoreList score={score} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },

  backNavigation: {
    marginTop: 32,
    marginLeft: 12,
  },

  profileView: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A260180',
  },

  userImage: {
    width: 170,
    height: 170,
  },

  userName: {
    fontSize: 20,
    color: 'white',
  },

  textOptions: {
    fontSize: 13,
    color: '#f2f2f2',
  },

  score: {
    marginTop: 66,
    alignItems: 'center',
  },
});
