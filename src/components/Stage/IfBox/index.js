import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Alert,
} from 'react-native';
import { useAction } from '../../../hooks/actions';

import ifText from '../../../assets/botoes/bt-if.png';
import banana from '../../../assets/botoes/bt-banana.png';
import bananaPeel from '../../../assets/botoes/bt-banana-peel.png';

const IfBox = () => {
  const [image, setImage] = useState(ifText);
  const [actionName, setActionName] = useState(' ');
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddToMain } = useAction();

  const change = () => {
    if (image === ifText) {
      setImage(banana);
      setActionName('banana');
    } else if (image === banana) {
      setImage(bananaPeel);
      setActionName('bananaPeel');
    } else {
      setImage(ifText);
      setActionName(' ');
    }
  };

  useEffect(() => {
    if (x > 460 && y > 30 && y < 180) {
      if (actionName !== ' ') {
        handleAddToMain(actionName, image);
        console.log(actionName);
      }
    }
  }, [x, y]);

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
        setX(gesture.moveX);
        setY(gesture.moveY);
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
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
