import React, { useState, useRef } from 'react';
import {
  View,
  Text, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Animated,
  PanResponder,
  Alert
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

import ActionBox from './ActionBox';
import MoveBox from './MoveBox';
import IfBox from './IfBox';
import LoopBox from './LoopBox';
import Main from './Main';

import map from '../../assets/mapas/mapa_completo.png';
import play from '../../assets/play.png';
import reset from '../../assets/reset.png';
import backArrow from '../../assets/backarrow.png';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stage = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const [instrunction, setInstrunction] = useState([]);
  var array = [];

  const onArea = (x,y) => {
    if(x > 460 && y > 30 && y < 180){
      array.push(1);
      console.log(array);
    }
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false
    }).start();

  }
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y },
        ],{useNativeDriver: false},
      ),
      onPanResponderRelease: (e, gesture) => {
        onArea(gesture.moveX, gesture.moveY)
      }
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground source={map} style={styles.imgMap} />
        <View style={styles.instructionSection}>
          <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
          >
          <ActionBox />
          </Animated.View>
          <MoveBox />
          <IfBox />
          <LoopBox />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.runOptions}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Image source={backArrow} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={play} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={reset} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 5 }}>
          <Main />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imgMap: {
    width: '29.3rem',
    height: '18.7rem',
    marginLeft: '0.8rem',
  },
  instructionSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '0.8rem',
    marginHorizontal: '1.8rem',
  },
  section: {
    flex: 1,
  },
  runOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});

export default Stage;