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
  const [actionName, setActionName] = useState(' ');
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const pan = useRef(new Animated.ValueXY()).current;
  const { handleAddToMain, handleAddToLoop } = useAction();

  const change = () => {
    if (image === move) {
      setImage(up);
      setActionName('up');
    } else if (image === up) {
      setImage(right);
      setActionName('right');
    } else if (image === right) {
      setImage(left);
      setActionName('left');
    } else if (image === left) {
      setImage(down);
      setActionName('down');
    } else {
      setImage(move);
      setActionName(' ');
    }
  };

  useEffect(() => {
    if (x > 460) {
      if (y > 30 && y < 180) {
        if (actionName !== ' ') {
          handleAddToMain(actionName, image);
        }
      } else if (y > 300 && y < 400 && actionName) {
        handleAddToLoop(actionName, image);
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
