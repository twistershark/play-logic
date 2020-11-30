import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import { useAction } from '../../../hooks/actions';

import loopText from '../../../assets/botoes/bt-loop.png';
import n1 from '../../../assets/botoes/bt-number1.png';
import n2 from '../../../assets/botoes/bt-number2.png';
import n3 from '../../../assets/botoes/bt-number3.png';
import n4 from '../../../assets/botoes/bt-number4.png';

const LoopBox = () => {
  const [image, setImage] = useState(loopText);
  const [actionName, setActionName] = useState(' ');
  const [x, setX] = useState();
  const [y, setY] = useState();
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddLoopToMain } = useAction();
  const change = () => {
    if (image === loopText) {
      setImage(n1);
      setActionName('1');
    } else if (image === n1) {
      setImage(n2);
      setActionName('2');
    } else if (image === n2) {
      setImage(n3);
      setActionName('3');
    } else if (image === n3) {
      setImage(n4);
      setActionName('4');
    } else {
      setImage(loopText);
      setActionName(' ');
    }
  };

  useEffect(() => {
    if (x > 460 && y > 30 && y < 150) {
      if (actionName !== ' ') {
        for (let i = 0; i < Number(actionName); i++) {
          handleAddLoopToMain();
        }
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

export default LoopBox;
