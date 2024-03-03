// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoy5EAXOnBuK4u1DXCSF1JQ-02qvxC_Lk",
    authDomain: "questfinder-dd466.firebaseapp.com",
    projectId: "questfinder-dd466",
    storageBucket: "questfinder-dd466.appspot.com",
    messagingSenderId: "429219253172",
    appId: "1:429219253172:web:cb0bef3d530e61486900e1",
    measurementId: "G-W4QPPSDT2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
