import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';

import ifText from '../../../assets/botoes/bt-if.png';
import banana from '../../../assets/botoes/bt-banana.png';
import bananaPeel from '../../../assets/botoes/bt-banana-peel.png';

const IfBox = () => {
  const [image, setImage] = useState(ifText);
  const [id, setId] = useState(-1);
  const pan = useRef(new Animated.ValueXY()).current;

  const change = () => {
    if (image === ifText) {
      setImage(banana);
    } else if (image === banana) {
      setImage(bananaPeel);
    } else setImage(ifText);
  };

  const onArea = (x, y) => {
    if (x > 460 && y > 30 && y < 180) {
      Alert.alert('Chegou');
    }
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y },
        ], { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gesture) => {
        onArea(gesture.moveX, gesture.moveY);
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View>
        <TouchableOpacity onPress={change}>
          <Image source={image} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default IfBox;
