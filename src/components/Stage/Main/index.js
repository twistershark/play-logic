import React from 'react';
import {
  View, Text, FlatList, Image, Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { useAction } from '../../../hooks/actions';

const MainList = () => {
  const { main } = useAction();

  return (
    <View style={{ height: 100 }}>
      <Text style={styles.title}>MAIN</Text>
      <View style={styles.list}>
        <FlatList
          data={main}
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
