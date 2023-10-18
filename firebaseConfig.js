import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAiClk7eRHOT8sWujTTI_3DGlU18TWaRHM', // these settings you can find in your Firebase project settings
  authDomain: 'social-media-app-2023-8c18e.firebaseapp.com',
  projectId: 'social-media-app-2023-8c18e',
  storageBucket: 'social-media-app-2023-8c18e.appspot.com',
  messagingSenderId: '1:998410110220:android:aa247458ce7b7e84407529',
  appId: '1:998410110220:android:aa247458ce7b7e84407529',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

auth()
  .signInWithEmailAndPassword('raghadomran49@gmail.com', 'Raghd193450Omran2011')
  .then(() => {
    console.log('User signed in!');
  })
  .catch(error => {
    console.error(error);
  });
  import React, { useState } from 'react';
  import { View, TextInput, Button } from 'react-native';
  import auth from '@react-native-firebase/auth';
  
  const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const createUser = () => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created!');
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    // Include similar functions for login, logout, password reset, etc.
  
    return (
      <View>
        {/* Include your input fields, buttons, etc. here */}
        <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
        <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
        <Button title="Sign Up" onPress={createUser} />
      </View>
    );
  };
  
  export default App;
  
const createPost = (userId, postData) => {
  return firestore()
    .collection('posts')
    .add({
      userId,
      ...postData,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};
