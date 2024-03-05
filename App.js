import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'; // Added import for ActivityIndicator component
import { __fetchFunction, API_BASE_URL } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListGuesses from './ListGuesses';

export default function App() {
    const [imgRefresher, setImgRefresher] = useState(0);
    const [availableOptions, setAvailableOptions] = useState([]);
    const [hasWon, setHasWon] = useState(false);
    const [userUID, setUserUID] = useState(false); // Removed userUID from the useState call
    const [hints, setHints] = useState({});

    useEffect(() => {
        getQuiz().then(data => {
            const copyHints = {};
            for (let k in data) {
                switch (k) {
                    case false: break;
                    case 'hintSize': copyHints.hintSize = data.hintSize; break;
                    case 'hintType': copyHints.hintType = data.hintType; break;
                    case 'hintCR': copyHints.hintCR = data.hintCR; break;
                    case 'hintHP': copyHints.hintHP = data.hintHP; break;
                    case 'hintMovement': copyHints.hintMovement = data.hintMovement; break;
                    case 'hintAlignment': copyHints.hintAlignment = data.hintAlignment; break;
                    case 'hintAC': copyHints.hintAC = data.hintAC; break;
                    default: break;
                }
            }
            setHints(copyHints);
            if (data.correct === true) {
                setHasWon(true);
                setImgRefresher(imgRefresher + 1);
            } else {
                setAvailableOptions(data.availableOptions);
            }
        });
    }, [userUID]);

    useEffect(() => {
        AsyncStorage.getItem('userUID').then(data => {
            if (!data) {
                data = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                AsyncStorage.setItem('userUID', data);
            }
            setUserUID(data);
        });
    }, []);

    const getQuiz = async () => {
        return __fetchFunction('api/quiz', 'GET', { userUID });
    }

    const guess = async (guessData = false) => {
        const guessBody = {};
        switch (guessData) {
            case false: break;
            case 'size': guessBody.hintSize = true; break;
            case 'type': guessBody.hintType = true; break;
            case 'cr': guessBody.hintCR = true; break;
            case 'hp': guessBody.hintHP = true; break;
            case 'movement': guessBody.hintMovement = true; break;
            case 'alignment': guessBody.hintAlignment = true; break;
            case 'ac': guessBody.hintAC = true; break;
            default: guessBody.exactGuessUID = guessData; break;
        }

        __fetchFunction('api/guess', 'POST', { guess: guessBody, userUID }).then(data => {
            if (data.correct === true) {
                setHasWon(true);
            } else {
                const copyHints = { ...hints };
                switch (guessData) {
                    case false: break;
                    case 'size': copyHints.hintSize = data.hintSize; break;
                    case 'type': copyHints.hintType = data.hintType; break;
                    case 'cr': copyHints.hintCR = data.hintCR; break;
                    case 'hp': copyHints.hintHP = data.hintHP; break;
                    case 'movement': copyHints.hintMovement = data.hintMovement; break;
                    case 'alignment': copyHints.hintAlignment = data.hintAlignment; break;
                    case 'ac': copyHints.hintAC = data.hintAC; break;
                    default: break;
                }
                setHints(copyHints);
                setAvailableOptions(data.availableOptions);
                setImgRefresher(imgRefresher + 1);
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to Monster Quiz!</Text>
            {hasWon && <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 20 }}>You won!</Text>}
            <Image source={{
                uri: `${API_BASE_URL}api/image-source?imgRefresher=${imgRefresher}&userUID=${userUID}`,
                headers: {
                    Pragma: 'no-cache'
                }
            }} style={{ width: 300, height: 300 }} />
            {hints.hintSize !== undefined ? <Text>{hints.hintSize}</Text> : <Pressable onPress={_ => guess('size')} >
                <Text>Hint Size</Text>
            </Pressable>}
            {hints.hintType !== undefined ? <Text>{hints.hintType}</Text> : <Pressable onPress={_ => guess('type')} >
                <Text>Hint Type</Text>
            </Pressable>}
            {hints.hintCR !== undefined ? <Text>{hints.hintCR}</Text> : <Pressable onPress={_ => guess('cr')} >
                <Text>Hint CR</Text>
            </Pressable>}
            {hints.hintHP !== undefined ? <Text>{hints.hintHP}</Text> : <Pressable onPress={_ => guess('hp')} >
                <Text>Hint HP</Text>
            </Pressable>}
            {hints.hintMovement !== undefined ? <Text>{hints.hintMovement}</Text> : <Pressable onPress={_ => guess('movement')} >
                <Text>Hint Movement</Text>
            </Pressable>}
            {hints.hintAlignment !== undefined ? <Text>{hints.hintAlignment}</Text> : <Pressable onPress={_ => guess('alignment')} >
                <Text>Hint Alignment</Text>
            </Pressable>}
            <ListGuesses list={availableOptions} guess={guess} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonPressed: {
        backgroundColor: '#0056b3',
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});
