import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import action from '../../assets/botoes/bt-action.png'; 
import eat from '../../assets/botoes/bt-eat-2.png';
import jump from '../../assets/botoes/bt-jump-1.png'; 


const ActionBox = () => {
  const [image, setImage] = useState(action); 

  const change = () => {
    if(image === action || image ===jump)
      setImage(eat);
    else 
      setImage(jump); 
  }

  return (
    <View>
      <TouchableOpacity onPress={change}>
        <Image source = {image} />
      </TouchableOpacity> 
    </View>
  )
}

export default ActionBox; 
