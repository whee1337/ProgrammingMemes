import React from "react";
import { Dimensions, View, Image, Share } from "react-native";
import { Meme } from "../models/Meme";
import { IconButton } from 'react-native-paper';

interface MemeComponentProps
{
    meme:Meme,
    onFavClicked: (meme: Meme) => void
}


export default  function MemeComponent({meme, onFavClicked} :MemeComponentProps)
{
    const windowWidth = Dimensions.get('window').width;
    const windowHeihgt = Dimensions.get('window').height;
    
    const onShare = async (item: Meme) => {
        try {
          const result = await Share.share({
            message:
              'Programming Memes | ' + item.link,
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

    return(
        <View style={{width:windowWidth, height:windowHeihgt/2 -2,  borderColor:"#D0D0D0",borderWidth:1}}>  
            <Image
            style={{width:"100%", height:"85%",resizeMode:"contain"}}
            source={{
            uri: meme.link,
            }}
            />
            <View style={{display:"flex", justifyContent:"flex-end", flexDirection: "row", marginRight:5}}>
            <IconButton     
                icon="heart"
                size={20}
                onPress={() => onFavClicked(meme)}> 
            </IconButton>
            <IconButton     
                icon="share-variant"
                size={20}
                onPress={() => onShare(meme)}> 
            </IconButton>
            </View>
      </View>
    )
}