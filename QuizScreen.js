// QuizScreen.js

import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { guess, API_BASE_URL, getToken } from './api';
import ListGuesses from './ListGuesses';

const QuizScreen = ({ quizData, user }) => {
    const [token, setToken] = useState(false);

    if (!quizData) {
        return <Text>Something went wrong...</Text>;
    }

    useEffect(() => {
        getToken(user).then(token => {
            setToken(token);
        })
    }, []);

    return (
        <View>
            {token ? <Image source={{
                uri: API_BASE_URL + '/api/image-source?auth=' + token,
                headers: {
                    Pragma: 'no-cache',
                    Authorization: `Bearer ${token}`
                },
            }} style={{ width: 400, height: 400 }} /> : <Image source={{
                uri: API_BASE_URL + 'api/image-source',
                headers: {
                    Pragma: 'no-cache'
                },
            }} style={{ width: 400, height: 400 }} />}
            <Pressable onPress={_ => guess('size', user)} >
                <Text>Hint Size</Text>
            </Pressable>
            <Pressable onPress={_ => guess('type', user)} >
                <Text>Hint Type</Text>
            </Pressable>
            <Pressable onPress={_ => guess('cr', user)} >
                <Text>Hint CR</Text>
            </Pressable>
            <Pressable onPress={_ => guess('hp', user)} >
                <Text>Hint HP</Text>
            </Pressable>
            <Pressable onPress={_ => guess('movement', user)} >
                <Text>Hint Movement</Text>
            </Pressable>
            <Pressable onPress={_ => guess('alignment', user)} >
                <Text>Hint type</Text>
            </Pressable>
            <ListGuesses list={quizData.availableOptions} user={user} />
        </View>
    );
};

export default QuizScreen;
