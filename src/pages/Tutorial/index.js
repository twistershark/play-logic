import React from 'react';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';

import tut from '../../assets/tutorial/tut.gif';

const Tutorial = () => {
  const navigation = useNavigation();

  Orientation.lockToLandscape();

  return (

    <>
      <View style={{
        alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 80,
      }}
      >
        <View style={{
          borderWidth: 2, borderColor: '#fff',
        }}
        >
          <Image
            source={tut}
            style={{
              height: 200, width: 430,
            }}
          />
        </View>

        <Text style={{
          fontSize: 16, flex: 2 / 3, marginTop: 16, textAlign: 'justify', lineHeight: 20, marginLeft: 16, fontWeight: 'bold',
        }}
        >
          Para jogar, basta clicar na caixa de ação que você deseja executar,
          arrastar a ação escolhida para a caixa MAIN ou LOOP e quando tiver inserido todas as ações que deseja, aperte o ▶ para iniciar o jogo.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Stages')}
        style={{
          alignSelf: 'center', marginTop: 24, backgroundColor: '#1A260180', borderRadius: 50, height: 50, width: 100, alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Voltar</Text>
      </TouchableOpacity>
    </>
  );
};

export default Tutorial;
