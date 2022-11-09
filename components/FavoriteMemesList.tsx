import React, { useEffect, useState } from "react";
import { AsyncStorage, FlatList } from "react-native";
import { Meme } from "../models/Meme";
import MemeComponent from "./MemeComponent";
import { Snackbar } from 'react-native-paper';

export default function FavoriteMemesList() {
    const [visible, setVisible] = useState(false);
    const [favorites, setFavorites] = useState<Meme[]>([]);


    const readFavorites = () => {
        return AsyncStorage.getItem('FAVS');
    };

    const storeFavorites = async (memeList: Meme[]) => {
        try {
            await AsyncStorage.mergeItem(
                'FAVS',
                JSON.stringify(memeList)
            );
        } catch (error) {
            // Error saving data
        }
    };

    useEffect(() => {
        readFavorites().then((response) => {
            if (!response) {
                setFavorites([]);
                return;
            }
            const value: string = response ?? "";
            const parsedList: Meme[] = JSON.parse(value);
            setFavorites(parsedList);
        })
    }, [])

    const removeFromFavorites = (meme: Meme) => {
        setFavorites((prevValue) => {
            const newValue = prevValue.filter((v: Meme) => v.link !== meme.link);
            storeFavorites(newValue);
            return newValue;
        })
        setVisible(true);
        setTimeout(() => setVisible(false), 2500);
    }

    const renderItem = ({ item }: any) => {
        return (
            <MemeComponent meme={item} onFavClicked={removeFromFavorites} />
        )
    }

    return (<><FlatList style={{ flex: 1, margin: 10, paddingBottom: 3 }} data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.link + Math.random()}>
    </FlatList>
        <Snackbar
            visible={visible}
            onDismiss={() => { setVisible(false) }}>
            Aus Favoriten entfernt!
        </Snackbar>
    </>)
}