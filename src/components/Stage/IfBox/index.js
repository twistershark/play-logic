import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import { useAction } from '../../../hooks/actions';

import ifText from '../../../assets/botoes/bt-if.png';
import trap from '../../../assets/botoes/bt-trap-v2.png';

const IfBox = () => {
  const [image, setImage] = useState(ifText);
  const [actionName, setActionName] = useState(' ');
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddToMain, handleAddToLoop } = useAction();

  const change = () => {
    if (image === ifText) {
      setImage(trap);
      setActionName('jump');
    } else {
      setImage(ifText);
      setActionName(' ');
    }
  };

  useEffect(() => {
    if (x > 460 && actionName !== ' ') {
      if (y > 30 && y < 250) {
        handleAddToMain(actionName, image);
      } else if (y > 250 && y < 400) {
        handleAddToLoop(actionName, image);
      }
    }
  }, [x, y]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (gesture) => !(gesture.dx > 5 && gesture.dy > 5),
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
