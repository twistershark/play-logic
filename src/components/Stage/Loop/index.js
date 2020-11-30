import React from 'react';
import {
  View, FlatList, Image, Text, StyleSheet,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { useAction } from '../../../hooks/actions';

const Loop = () => {
  const { loop } = useAction();
  return (
    <View>
      <Text style={styles.title}>LOOP</Text>
      <FlatList
        data={loop}
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
