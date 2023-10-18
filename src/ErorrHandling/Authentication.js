import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      setErrorMessage('Email and password cannot be empty.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // Navigate to a different screen after successful login
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect email or password.');
        } else {
          setErrorMessage(error.message);  // Generic error message or you might want to customize further
        }
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={{ width: '80%', borderBottomWidth: 1 }} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry style={{ width: '80%', borderBottomWidth: 1, marginTop: 20 }} />
      <TouchableOpacity onPress={handleLogin} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }}>
        <Text style={{ color: 'white' }}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
