import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MemeListView from './components/MemeListView';
import { BottomNavigation } from 'react-native-paper';
import FavoriteMemesList from './components/FavoriteMemesList';

export default function App() {
  const ListRoute = () => <MemeListView></MemeListView>;
  const FavRoute = () => <FavoriteMemesList></FavoriteMemesList>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list', title: 'New', focusedIcon: 'album'},
    { key: 'fav', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    list: ListRoute,
    fav: FavRoute,
  });

  return (
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

/*      <MemeListView></MemeListView>
      <StatusBar style="auto" />

      <Text>Open up App.tsx to starsst working on your app!</Text>

*/