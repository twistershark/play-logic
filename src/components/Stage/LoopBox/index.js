import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import { useAction } from '../../../hooks/actions';

import loop from '../../../assets/botoes/bt-loop.png';
import n1 from '../../../assets/botoes/bt-number1.png';
import n2 from '../../../assets/botoes/bt-number2.png';
import n3 from '../../../assets/botoes/bt-number3.png';
import n4 from '../../../assets/botoes/bt-number4.png';

const LoopBox = () => {
  const [image, setImage] = useState(loop);
  const [id, setId] = useState(-1);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddToMain } = useAction();
  const change = () => {
    if (image === loop) {
      setImage(n1);
      setId(9);
    } else if (image === n1) {
      setImage(n2);
      setId(10);
    } else if (image === n2) {
      setImage(n3);
      setId(11);
    } else if (image === n3) {
      setImage(n4);
      setId(12);
    } else {
      setImage(loop);
      setId(-1);
    }
  };

  useEffect(() => {
    if (x > 460 && y > 30 && y < 180) {
      if (id > -1) {
        alert('Muito bem');
        handleAddToMain(id, image);
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
