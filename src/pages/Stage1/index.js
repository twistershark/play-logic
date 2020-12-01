import React, {
  useCallback,
  useEffect, useRef,
  useState,
} from 'react';
import { View } from 'react-native';

import SpriteSheet from 'rn-sprite-sheet';
import Orientation from 'react-native-orientation-locker';
import Stage from '../../components/Stage';
// import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';

import monkeySprite from '../../assets/personagens/macaco/Macaco_Spritesheet.png';
import map from '../../assets/mapas/mapa_fase1_v1.png';

const Stage1 = () => {
  Orientation.lockToLandscape();
  const [barriers, setBarriers] = useState([{ x: 390, y: 160 }, { x: 390, y: 128 }, { x: 358, y: 96 },
    { x: 358, y: 64 }, { x: 358, y: 192 }, { x: 326, y: 224 }, { x: 294, y: 64 },
    { x: 262, y: 64 }, { x: 230, y: 64 }, { x: 230, y: 160 }, { x: 230, y: 192 },
    { x: 230, y: 224 }, { x: 198, y: 64 }, { x: 198, y: 192 }, { x: 198, y: 224 },
    { x: 166, y: 224 }, { x: 134, y: 64 }, { x: 134, y: 224 }, { x: 102, y: 64 },
    { x: 102, y: 192 }, { x: 102, y: 224 }, { x: 70, y: 64 }, { x: 70, y: 96 },
    { x: 70, y: 128 }, { x: 70, y: 160 }, { x: 70, y: 192 }, { x: 70, y: 224 },
    { x: 166, y: 32 },
  ]);
  let monkey;
  const [animation, setAnimation] = useState('down');
  const xRef = useRef(102); // initial 102
  const yRef = useRef(160); // initial 102
  const {
    main, start, setStart, setMain,
  } = useAction();
  // const { handleScoreUpdate } = useAuth();

  // const updateScore = useCallback(() => {
  //   handleScoreUpdate(2, 3);
  // }, [handleScoreUpdate]);

  const isValid = useCallback((currentPosition) => {
    for (let i = 0; i < barriers.length; i++) {
      if (barriers[i].x === currentPosition.x && barriers[i].y === currentPosition.y) {
        return false;
      }
    }
    return true;
  }, [barriers]);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        if (main.length > 0) {
          const currentAction = main.shift();
          let currentXY;
          switch (currentAction.action) {
            case 'right':
              currentXY = { x: xRef.current + 32, y: yRef.current };
              if (isValid(currentXY)) {
                setAnimation('right');
                xRef.current += 32;
              }
              break;
            case 'left':
              currentXY = { x: xRef.current - 32, y: yRef.current };
              if (isValid(currentXY)) {
                setAnimation('left');
                xRef.current -= 32;
              }
              break;
            case 'up':
              currentXY = { x: xRef.current, y: yRef.current - 32 };
              if (isValid(currentXY)) {
                setAnimation('up');
                yRef.current -= 32;
              }
              break;
            case 'down':
              currentXY = { x: xRef.current, y: yRef.current + 32 };
              if (isValid(currentXY)) {
                setAnimation('down');
                yRef.current += 32;
              }
              break;
            default:
              break;
          }
          // Remove primeira ação da fila
          // setMain(main.filter((action) => action.id !== currentAction.id));

          // Evita remover item com o mesmo id
          setMain(main.slice(0));
        } else {
          clearTimeout();
          setStart(false);
        }
      }, 1000);
    }
  }, [start, setStart, main, setMain, isValid]);

  useEffect(() => {
    monkey.play({
      type: animation,
      fps: 12,
      loop: true,
    });
  }, [monkey, animation]);

  return (
    <View>
      <Stage map={map} />
      <View style={{ position: 'absolute', top: yRef.current, left: xRef.current }}>
        <SpriteSheet
          ref={(ref) => (monkey = ref)}
          source={monkeySprite}
          columns={6}
          rows={4}
          width={40}
          animations={{
            up: [18, 19, 20],
            right: [6, 7, 8, 9, 8, 7, 6, 7, 8, 9, 8, 7, 6, 7, 8, 9, 11, 9, 8, 7],
            left: [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 5, 3, 2, 1],
            down: [12, 13, 15, 13],
          }}
        />
      </View>
    </View>

  );
};

export default Stage1;
