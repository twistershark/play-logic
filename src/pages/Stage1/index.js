import React, {
  useEffect, useRef,
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
  const barriers = [];
  let monkey;
  const xRef = useRef(358); // initial 102
  const yRef = useRef(164); // initial 102
  const {
    main, start, setStart, setMain,
  } = useAction();
  // const { handleScoreUpdate } = useAuth();

  // const updateScore = useCallback(() => {
  //   handleScoreUpdate(2, 3);
  // }, [handleScoreUpdate]);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        if (main.length > 0) {
          let currentXY;
          const currentAction = main.shift();
          switch (currentAction.action) {
            case 'right':
              currentXY = [{ x: xRef + 32, y: yRef }];
              if (xRef.current + 32 <= 390) {
                xRef.current += 32;
              }
              break;
            case 'left':
              if (xRef.current - 32 >= 70) {
                xRef.current -= 32;
              }
              break;
            case 'up':
              if (yRef.current - 32 >= 68) {
                yRef.current -= 32;
              }
              break;
            case 'down':
              if (yRef.current + 32 <= 228) {
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
  }, [start, setStart, main, setMain]);
  //
  useEffect(() => {
    monkey.play({
      type: 'idle',
      fps: 12,
      loop: true,
    });
  }, [monkey]);

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
            idle: [0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 2, 1, 0, 1, 2, 3, 5, 3, 2, 1, 0],
          }}
        />
      </View>
    </View>

  );
};

export default Stage1;
