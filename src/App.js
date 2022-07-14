import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FlipCard from './components/FlipCard';
import React from 'react';
import useRandomUser from './hook/useRandomUser';

const App = () => {
  const {randomUser, getAnotherRandomUser} = useRandomUser();

  const fetchAnotherUser = () => {
    getAnotherRandomUser();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={fetchAnotherUser} style={styles.button}>
        <Text style={styles.titleButton}>Fetch Random</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <FlatList
          columnWrapperStyle={styles.wrapperStyle}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          data={randomUser}
          renderItem={({item}) => (
            <FlipCard
              name={item?.username}
              title={item?.employment?.title}
              image={item?.avatar}
              {...item}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 16},
  button: {
    backgroundColor: 'red',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  titleButton: {color: 'white', fontWeight: 'bold'},
  content: {backgroundColor: '#E1F5DC', flex: 1, padding: 16},
  wrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default App;
