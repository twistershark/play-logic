import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import { useAction } from '../../../hooks/actions';

import move from '../../../assets/botoes/bt-move.png';
import up from '../../../assets/botoes/bt-up.png';
import down from '../../../assets/botoes/bt-down.png';
import left from '../../../assets/botoes/bt-left.png';
import right from '../../../assets/botoes/bt-right.png';

const MoveBox = () => {
  const [image, setImage] = useState(move);
  const [id, setId] = useState(-1);
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddToMain } = useAction();

  const change = () => {
    if (image === move) {
      setImage(up);
      setId(2);
    } else if (image === up) {
      setImage(right);
      setId(3);
    } else if (image === right) {
      setImage(left);
      setId(4);
    } else if (image === left) {
      setImage(down);
      setId(5);
    } else {
      setImage(move);
      setId(-1);
    }
  };

  useEffect(() => {
    if (x > 460 && y > 30 && y < 180) {
      if (id > -1) {
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

export default MoveBox;
