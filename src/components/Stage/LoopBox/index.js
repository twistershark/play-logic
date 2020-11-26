import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import loop from '../../../assets/botoes/bt-loop.png';
import n1 from '../../../assets/botoes/bt-number1.png';
import n2 from '../../../assets/botoes/bt-number2.png';
import n3 from '../../../assets/botoes/bt-number3.png';
import n4 from '../../../assets/botoes/bt-number4.png';

const LoopBox = () => {
  const [image, setImage] = useState(loop);

  const change = () => {
    if (image === loop || image === n4) { setImage(n1); } else if (image === n1) setImage(n2);
    else if (image === n2) setImage(n3);
    else { setImage(n4); }
  };

  return (
    <View>
      <TouchableOpacity onPress={change}>
        <Image source={image} />
      </TouchableOpacity>
    </View>
  );
};

export default LoopBox;
