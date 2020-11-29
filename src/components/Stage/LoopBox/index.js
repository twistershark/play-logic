import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';

import loop from '../../../assets/botoes/bt-loop.png';
import n1 from '../../../assets/botoes/bt-number1.png';
import n2 from '../../../assets/botoes/bt-number2.png';
import n3 from '../../../assets/botoes/bt-number3.png';
import n4 from '../../../assets/botoes/bt-number4.png';

const LoopBox = () => {
  const [image, setImage] = useState(loop);
  const pan = useRef(new Animated.ValueXY()).current;

  const change = () => {
    if (image === loop) {
      setImage(n1);
    } else if (image === n1) {
      setImage(n2);
    } else if (image === n2) {
      setImage(n3);
    } else if (image === n3) {
      setImage(n4);
    } else {
      setImage(loop);
    }
  };

  const onArea = (x, y) => {
    if (x > 460 && y > 30 && y < 180) {
      // atualizar o valor do array global;
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

export default LoopBox;
