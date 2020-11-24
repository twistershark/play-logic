import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import move from '../../assets/botoes/bt-move.png'; 
import  up from '../../assets/botoes/bt-up.png';
import spinR from '../../assets/botoes/bt-spin-cw.png'
import spinL from '../../assets/botoes/bt-spin-cc.png'


const MoveBox = () => {
  const [image, setImage] = useState(move); 

  const change = () => {
 
  }

  return (
    <View>
      <TouchableOpacity onPress={change}>
        <Image source = {image} />
      </TouchableOpacity> 
    </View>
  )
}

export default MoveBox; 
