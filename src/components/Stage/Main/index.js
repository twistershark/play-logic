import React from 'react';
import {
  View, Text, FlatList, StyleSheet, Image,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const MainList = () => {
  const data = [
    { key: 1, value: 0 }, { key: 2, value: 0 }, { key: 3, value: 0 }, { key: 4, value: 0 },
    { key: 5, value: 0 }, { key: 6, value: 0 }, { key: 7, value: 0 }, { key: 8, value: 0 }];

  return (
    <View>
      <Text style={styles.title}>MAIN</Text>
      <FlatList
        style={styles.list}
        data={data}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={null} />
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
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFE342',
    margin: '0.25rem',
  },
});
export default MainList;
