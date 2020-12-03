import React from 'react';
import {
  View, Text, Animated, Image, Dimensions, StatusBar, TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

import { DATA, bgs } from './data';

const { width, height } = Dimensions.get('screen');

const Indicator = ({ scrollX }) => (
  <View style={{ position: 'absolute', bottom: 60, flexDirection: 'row' }}>
    {DATA.map((_, index) => {
      const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.6, 0.9, 0.6],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={`indicator-${index}`}
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: '#fff',
            opacity,
            margin: 10,
            transform: [
              {
                scale,
              },
            ],
          }}
        />
      );
    })}
  </View>
);

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, index) => index * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[EStyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  const SquareMovement = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width),
    ), 1,
  );

  const rotate = SquareMovement.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = SquareMovement.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.68,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          }],
      }}
    />
  );
};

const OnBoarding = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center', padding: 20 }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <Image source={item.image} style={{ width: width / 2.5, height: width / 2.5, resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={{
                fontWeight: 'bold', fontSize: 32, marginBottom: 10, color: '#fff',
              }}
              >
                {item.title}
              </Text>
              <Text style={{ fontWeight: 'normal', color: '#fff', fontSize: 18 }}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#fff',
          height: 40,
          width: 88,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 5,
          right: 6,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
