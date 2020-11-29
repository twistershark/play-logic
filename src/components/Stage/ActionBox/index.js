import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';

import action from '../../../assets/botoes/bt-action.png';
import eat from '../../../assets/botoes/bt-eat-2.png';
import jump from '../../../assets/botoes/bt-jump-1.png';

const ActionBox = () => {
  const [image, setImage] = useState(action);
  const pan = useRef(new Animated.ValueXY()).current;

  const change = () => {
    if (image === action) {
      setImage(eat);
    } else if (image === eat) {
      setImage(jump);
    } else {
      setImage(action);
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

export default ActionBox;
