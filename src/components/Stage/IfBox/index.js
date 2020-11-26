import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import ifText from '../../../assets/botoes/bt-if.png';
import banana from '../../../assets/botoes/bt-banana.png';
import bananaPeel from '../../../assets/botoes/bt-banana-peel.png';

const IfBox = () => {
  const [image, setImage] = useState(ifText);

  const change = () => {
    if (image === ifText || image === bananaPeel) { setImage(banana); } else { setImage(bananaPeel); }
  };

  return (
    <View>
      <TouchableOpacity onPress={change}>
        <Image source={image} />
      </TouchableOpacity>
    </View>
  );
};

export default IfBox;
