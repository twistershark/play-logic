import React, { useEffect } from 'react';
import { View } from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';

import monkeySprite from '../../assets/personagens/macaco/Macaco_Spritesheet.png';

const TestAnimation = () => {
  let monkey;

  useEffect(() => {
    monkey.play({
      type: 'idle',
      fps: 12,
      loop: true,
    });
  }, [monkey]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 50, left: 50 }}>
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

export default TestAnimation;
