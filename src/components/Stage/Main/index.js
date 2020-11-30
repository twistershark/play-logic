import React from 'react';
import {
  View, Text, FlatList, Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { useAction } from '../../../hooks/actions';

const MainList = () => {
  const { main } = useAction();

  const nullData = [
    { id: 0, action: 'undefined', image: null },
    { id: 1, action: 'undefined', image: null },
    { id: 2, action: 'undefined', image: null },
    { id: 3, action: 'undefined', image: null },
    { id: 4, action: 'undefined', image: null },
    { id: 5, action: 'undefined', image: null },
    { id: 6, action: 'undefined', image: null },
    { id: 7, action: 'undefined', image: null },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAIN</Text>
      <View style={styles.list}>
        <FlatList
          data={main.length ? main : nullData}
          numColumns={4}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={{ width: '100%', height: '100%' }} source={item.image} />
            </View>
          )}
        />
      </View>

    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: '3.2rem',
    marginBottom: '2rem',
  },
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
export default MainList;
