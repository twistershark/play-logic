import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';

import move from '../../../assets/botoes/bt-move.png';
import up from '../../../assets/botoes/bt-up.png';
import down from '../../../assets/botoes/bt-down.png';
import left from '../../../assets/botoes/bt-left.png';
import right from '../../../assets/botoes/bt-right.png';

const MoveBox = () => {
  const [image, setImage] = useState(move);
  const pan = useRef(new Animated.ValueXY()).current;

  const change = () => {
    if (image === move) {
      setImage(up);
    } else if (image === up) { setImage(right); } else if (image === right) {
      setImage(left);
    } else if (image === left) {
      setImage(down);
    } else {
      setImage(move);
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

export default MoveBox;
