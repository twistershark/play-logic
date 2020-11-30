import React from 'react';
import {
  View, FlatList, Image, Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { useAction } from '../../../hooks/actions';

const Loop = () => {
  const { loop } = useAction();
  const nullData = [
    { id: 0, action: 'undefined', image: null },
    { id: 1, action: 'undefined', image: null },
    { id: 2, action: 'undefined', image: null },
    { id: 3, action: 'undefined', image: null },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOOP</Text>
      <FlatList
        data={loop.length ? loop : nullData}
        style={styles.list}
        numColumns={4}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image style={{ width: '100%', height: '100%' }} source={item.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = EStyleSheet.create({

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  list: {
    borderColor: '#592C15',
    borderWidth: 3,
  },

  item: {
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#FFE342',
    margin: '0.25rem',
    flex: 1 / 4,
  },
});

export default Loop;
