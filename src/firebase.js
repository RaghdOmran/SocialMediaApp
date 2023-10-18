import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAiClk7eRHOT8sWujTTI_3DGlU18TWaRHM', // these settings you can find in your Firebase project settings
    authDomain: 'social-media-app-2023-8c18e.firebaseapp.com',
    projectId: 'social-media-app-2023-8c18e',
    storageBucket: 'social-media-app-2023-8c18e.appspot.com',
    messagingSenderId: '1:998410110220:android:aa247458ce7b7e84407529',
    appId: '1:998410110220:android:aa247458ce7b7e84407529',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

export { db };
