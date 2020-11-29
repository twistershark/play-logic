import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import SpriteSheet from 'rn-sprite-sheet';
import Stage from '../../components/Stage';
import { useAuth } from '../../hooks/auth';

import backArrow from '../../assets/backarrow.png';

import monkeySprite from '../../assets/personagens/macaco/Macaco_Spritesheet.png';

const Stage1 = () => {
  const { handleScoreUpdate } = useAuth();
  // const navigation = useNavigation();

  const updateScore = useCallback(() => {
    handleScoreUpdate(2, 3);
  }, [handleScoreUpdate]);

  let monkey;

  const [x, setX] = useState(97);

  useEffect(() => {
    monkey.play({
      type: 'idle',
      fps: 12,
      loop: true,
    });

    setTimeout(() => {
      if (x <= 382) {
        setX(x + 32);
      }
    }, 1000);
  }, [monkey, x]);

  return (
    <View>
      <Stage />
      <View style={{ position: 'absolute', top: 225, left: x }}>
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
