import React, { useEffect, useState } from 'react';
import useMemes from '../hooks/useMemes';
import { Meme } from '../models/Meme';
import { FlatList, Image, View, Share, AsyncStorage} from 'react-native';
import { Dimensions } from 'react-native';
import { Button,IconButton,Snackbar } from 'react-native-paper';
import MemeComponent from './MemeComponent';



export default function MemeListView() {
    const [memeList, setMemes] = useState<Meme[]>([]);
    const [visible, setVisible] = useState(false);
    const [favorites, setFavorites] = useState<Meme[]>([]);

    const memes = useMemes();
          
    const readFavorites = () => {
            return  AsyncStorage.getItem('FAVS');
      };

      const storeFavorites = async (memeList: Meme[]) => {
        try {
          await AsyncStorage.setItem(
            'FAVS',
            JSON.stringify(memeList)
          );
        } catch (error) {
          // Error saving data
        }
      };

    useEffect(()=>{
        readFavorites().then((response)=> {
            if(!response)
            {
                setFavorites([]);
                return;
            }

            const value:string = response ?? "";
            const parsedList: Meme[] = JSON.parse(value);
            setFavorites(parsedList);
        }).catch((e) => console.log(e))
    },[])

    useEffect(()=>{
        memes.then((response)=> setMemes(response.data))
    },[])

    const addToFavorites = (meme:Meme) => {
        setFavorites((prevValue) => {
            storeFavorites([...prevValue,meme]);
            return [...prevValue,meme];
        })
        setVisible(true);
        setTimeout(() => setVisible(false), 2500);
  }

    const renderItem = ({ item }:any) => {
        return(
            <MemeComponent meme={item} onFavClicked={addToFavorites} />
        )
    }

    return (<><FlatList style={{ flex:1, margin:10, paddingBottom: 3}} data={memeList}
        renderItem={renderItem}
        keyExtractor={item => item.link + Math.random()}>
       </FlatList>
       <Snackbar
        visible={visible}
        onDismiss={() => { setVisible(false)}}>
        Zu Favoriten hinzugefügt! 
      </Snackbar>
      </>
       )
}

/*
<Image source={{uri: item.link}}/>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.redd.it/d7j4ucr1ks391.jpg',
        }}
      />


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
 {memeList.map(v => )}
       src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
*/