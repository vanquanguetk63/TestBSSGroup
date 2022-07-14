import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';

const FlipCard = ({title, image, name, ...props}) => {
  const animate = useRef(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const onFlipping = () => {
    Animated.timing(animate.current, {
      toValue: isFlipped ? 0 : 180,
      easing: Easing.cubic,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const interpolatedValueDown = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const interpolatedValueUp = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const rotateDown = useMemo(
    () => ({
      transform: [
        {
          rotateY: interpolatedValueDown,
        },
      ],
    }),
    [interpolatedValueDown],
  );

  const rotateUp = useMemo(
    () => ({
      transform: [
        {
          rotateY: interpolatedValueUp,
        },
      ],
    }),
    [interpolatedValueUp],
  );
  return (
    <TouchableOpacity onPress={onFlipping} style={styles.container}>
      <Animated.View style={[styles.front, rotateDown]}>
        <Image
          resizeMode="contain"
          style={styles.images}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.name}>{name}</Text>
        <Text numberOfLines={2}>{title}</Text>
      </Animated.View>

      <Animated.View style={[styles.back, rotateUp]}>
        <View style={styles.backView}>
          <Text>First name: {props.first_name}</Text>
          <Text>Last name: {props.last_name}</Text>
          <Text>Email: {props.email}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  front: {
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    width: '100%',
    backfaceVisibility: 'hidden',
    height: '100%',
  },
  card: {
    height: '100%',
    backgroundColor: 'red',
  },
  container: {
    height: 220,
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
  },
  images: {width: '100%', height: 128},
  name: {fontWeight: 'bold', marginVertical: 8},
  backView: {
    padding: 8,
  },
});
