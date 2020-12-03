import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, Image } from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';
import Orientation from 'react-native-orientation-locker';

import { useAuth } from '../../hooks/auth';
import { useAction } from '../../hooks/actions';

import Stage from '../../components/Stage';
import Score from '../../components/Score';
import { barriersArray, bananasArray, trapsArray } from './positions';

import monkeySprite from '../../assets/personagens/macaco/Macaco_Spritesheet.png';
import banana from '../../assets/objetos/banana_normal.png';
import map from '../../assets/mapas/mapa_fase2_v4.png';

const Stage2 = () => {
  let monkey;
  const [barriers, setBarriers] = useState(barriersArray);
  const [opacityBanana, setOpacityBanana] = useState([1, 1, 1]);
  const [bananasEaten, setBananasEaten] = useState(0);

  const [animation, setAnimation] = useState('down');
  const xRef = useRef(102); // initial 102
  const yRef = useRef(160); // initial 102

  const [gameStarted, setGameStarted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const {
    main, start, setStart, setMain,
  } = useAction();

  Orientation.lockToLandscape();

  const { handleScoreUpdate } = useAuth();

  const updateScore = useCallback(() => {
    handleScoreUpdate(2, score);
  }, [handleScoreUpdate]);

  const captured = (currentPosition) => {
    for (let i = 0; i < trapsArray.length; i++) {
      if (trapsArray[i].x === currentPosition.x && trapsArray[i].y === currentPosition.y) { return true; }
    }
    return false;
  };
  const jump = (currentPosition) => {
    for (let i = 0; i < trapsArray.length; i++) {
      if (trapsArray[i].x === currentPosition.x + 32 && trapsArray[i].y === currentPosition.y) { return 'right'; }
      if (trapsArray[i].x === currentPosition.x - 32 && trapsArray[i].y === currentPosition.y) { return 'left'; }
      if (trapsArray[i].x === currentPosition.x && trapsArray[i].y === currentPosition.y + 32) { return 'down'; }
      if (trapsArray[i].x === currentPosition.x && trapsArray[i].y === currentPosition.y - 32) { return 'up'; }
    }
    return null;
  };

  const eat = (currentPosition) => {
    for (let i = 0; i < bananasArray.length; i++) {
      if (bananasArray[i].x === currentPosition.x && bananasArray[i].y === currentPosition.y
        && opacityBanana[i] === 1) {
        switch (i) {
          case 0:
            setOpacityBanana([0, opacityBanana[1], opacityBanana[2]]);
            break;
          case 1:
            setOpacityBanana([opacityBanana[0], 0, opacityBanana[2]]);
            break;
          case 2:
            setOpacityBanana([opacityBanana[0], opacityBanana[1], 0]);
            break;
          default:
            break;
        }
        return true;
      }
    }
    return false;
  };

  const isValid = (currentPosition) => {
    for (let i = 0; i < barriers.length; i++) {
      if (barriers[i].x === currentPosition.x && barriers[i].y === currentPosition.y) {
        return false;
      }
    }
    return true;
  };

  const contInstructions = (currentId) => {
    if (main.length > 1) {
      if (currentId !== main[1].id) {
        setMoves(moves + 1);
      }
    } else {
      setMoves(moves + 1);
    }
  };

  const contScore = () => {
    if (bananasEaten === 3) {
      if (moves < 15) {
        setScore(3);
      } else if (moves < 19) {
        setScore(2);
      } else {
        setScore(1);
      }
    } else {
      setScore(0);
    }
  };

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        if (main.length > 0) {
          setGameStarted(true);
          const currentAction = main.shift();
          let currentXY;

          switch (currentAction.action) {
            case 'right':
              currentXY = { x: xRef.current + 32, y: yRef.current };
              if (isValid(currentXY)) {
                setAnimation('right');
                xRef.current += 32;
                contInstructions(currentAction.id);
              }
              break;

            case 'left':
              currentXY = { x: xRef.current - 32, y: yRef.current };
              if (isValid(currentXY)) {
                setAnimation('left');
                xRef.current -= 32;
                contInstructions(currentAction.id);
              }
              break;

            case 'up':
              currentXY = { x: xRef.current, y: yRef.current - 32 };
              if (isValid(currentXY)) {
                setAnimation('up');
                yRef.current -= 32;
                contInstructions(currentAction.id);
              }
              break;

            case 'down':
              currentXY = { x: xRef.current, y: yRef.current + 32 };
              if (isValid(currentXY)) {
                setAnimation('down');
                yRef.current += 32;
                contInstructions(currentAction.id);
              }
              break;
            case 'eat':
              currentXY = { x: xRef.current, y: yRef.current };
              if (eat(currentXY)) {
                setBananasEaten(bananasEaten + 1);
                contInstructions(currentAction.id);
              }
              break;
            case 'jump':
              currentXY = { x: xRef.current, y: yRef.current };
              switch (jump(currentXY)) {
                case 'right':
                  setAnimation('right');
                  xRef.current += 64;
                  break;
                case 'left':
                  setAnimation('left');
                  xRef.current -= 64;
                  break;
                case 'up':
                  setAnimation('up');
                  yRef.current -= 64;
                  break;
                case 'down':
                  setAnimation('down');
                  yRef.current += 64;
                  break;
                default:
                  break;
              }
              break;
            default:
              break;
          }
          if (captured(currentXY)) {
            setMain([]);
          }
          setMain(main.slice(0));
        } else {
          clearTimeout();
          setStart(false);
          if (gameStarted) {
            contScore();
            setModalVisible(true);
            updateScore();
          }
        }
      }, 1000);
    }
  }, [start, main, setMain]);

  useEffect(() => {
    monkey.play({
      type: animation,
      fps: 12,
      loop: true,
    });
  }, [monkey, animation]);

  return (

    <View>
      {modalVisible === true && <Score isVisible={modalVisible} score={score} />}

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
      <View style={{
        position: 'absolute', top: bananasArray[0].y, left: bananasArray[0].x, opacity: opacityBanana[0],
      }}
      >
        <Image source={banana} />
      </View>
      <View style={{
        position: 'absolute', top: bananasArray[1].y, left: bananasArray[1].x, opacity: opacityBanana[1],
      }}
      >
        <Image source={banana} />
      </View>
      <View style={{
        position: 'absolute', top: bananasArray[2].y, left: bananasArray[2].x, opacity: opacityBanana[2],
      }}
      >
        <Image source={banana} />
      </View>
    </View>

  );
};

export default Stage2;
