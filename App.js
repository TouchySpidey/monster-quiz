import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, Image } from 'react-native'; // Added import for ActivityIndicator component
import QuizScreen from './QuizScreen';
import { guess, getQuiz, API_BASE_URL } from './api';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
const provider = new GoogleAuthProvider();


const firebaseConfig = {
    apiKey: "AIzaSyCoy5EAXOnBuK4u1DXCSF1JQ-02qvxC_Lk",
    authDomain: "questfinder-dd466.firebaseapp.com",
    projectId: "questfinder-dd466",
    storageBucket: "questfinder-dd466.appspot.com",
    messagingSenderId: "429219253172",
    appId: "1:429219253172:web:cb0bef3d530e61486900e1",
    measurementId: "G-W4QPPSDT2R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
    const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
    const [isPlaying, setIsPlaying] = useState(false); // Added state for playing quiz
    const [user, setUser] = useState(null);
    let authOk = false;

    const [responseData, setResponseData] = useState(null); // Added state for response data

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (user) => {
            if (!user || authOk) return;
            authOk = true;
            setUser(user);
            getQuiz()
                .then((data) => {
                    console.log(data);
                    setResponseData(data); // Store response data in state variable
                    setIsPlaying(true); // Set playing state to true
                })
                .finally(() => {
                    setIsLoading(false); // Set loading state to false after fetching quiz data
                });
        });
        return sub;
    }, []);

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log({ result });
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log({ credential });
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ user });
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({ errorCode, errorMessage, email, credential })
            });
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to Monster Quiz!</Text>
            {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : (
                isPlaying ? <QuizScreen quizData={responseData} user={user} /> : <><Image source={{
                    uri: API_BASE_URL + '/api/image-source',
                    headers: {
                        Pragma: 'no-cache',
                    },
                }} style={{ width: 400, height: 400 }} />
                    <Pressable onPress={login} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
                        <Text style={styles.text}>Login to start Quiz</Text>
                    </Pressable></>
            )}
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
