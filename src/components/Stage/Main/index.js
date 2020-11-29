import React from 'react';
import {
  View, Text, FlatList, Image, Dimensions,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const MainList = () => {
  const data = [
    { key: 1, value: 0 }, { key: 2, value: 0 }, { key: 3, value: 0 }, { key: 4, value: 0 },
    { key: 5, value: 0 }, { key: 6, value: 0 }, { key: 7, value: 0 }, { key: 8, value: 0 }];

  return (
    <View style={{ height: Dimensions.get('window').height / 3 }}>
      <Text style={styles.title}>MAIN</Text>
      <View style={styles.list}>
        <FlatList
          data={data}
          numColumns={4}
          keyExtractor={(item, index) => item.key + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={{ width: '100%', height: '100%' }} source={null} />
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
