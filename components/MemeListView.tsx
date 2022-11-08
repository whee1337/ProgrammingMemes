import React, { useEffect, useState } from 'react';
import useMemes from '../hooks/useMemes';
import { Meme } from '../models/Meme';
import { FlatList, Image, View, Share, AsyncStorage} from 'react-native';
import { Dimensions } from 'react-native';
import { Button,IconButton } from 'react-native-paper';



export default function MemeListView() {
    const [memeList, setMemes] = useState<Meme[]>([]);
    const windowWidth = Dimensions.get('window').width;
    const windowHeihgt = Dimensions.get('window').height;

    const memes = useMemes();

    useEffect(()=>{
        memes.then((response)=> setMemes(response.data))
    },[])
    
    const storeFavorites = async () => {
        try {
          await AsyncStorage.setItem(
            'FAV',
            'I like to save it.'
          );
        } catch (error) {
          // Error saving data
        }
      };
    
      const readFavorites = async () => {
        console.log("Read")
        try {
          const value = await AsyncStorage.getItem('FAV');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    const onShare = async (item: Meme) => {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React ' + item.link,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    useEffect(()=>{
        storeFavorites();
        console.log("STORED")
    }, [])
    const renderItem = ({ item }:any) => {
        return(
            <View style={{width:windowWidth, height:windowHeihgt/2 -2,  borderColor:"#D0D0D0",borderWidth:1}}>  
                <Image
                style={{width:"100%", height:"85%",resizeMode:"contain"}}
                source={{
                uri: item.link,
                }}
                />
                <View style={{display:"flex", justifyContent:"flex-end", flexDirection: "row", marginRight:5}}>
                <IconButton     
                    icon="heart"
                    size={20}
                    onPress={() => readFavorites()}> 
                </IconButton>
                <IconButton     
                    icon="share-variant"
                    size={20}
                    onPress={() => onShare(item)}> 
                </IconButton>
                </View>
          </View>
        )
    }

    return (<FlatList style={{ flex:1, margin:10, paddingBottom: 3}} data={memeList}
        renderItem={renderItem}
        keyExtractor={item => item.link + Math.random()}>
       </FlatList>)
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