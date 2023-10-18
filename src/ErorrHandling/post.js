import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PostCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreatePost = () => {
    if (title.trim() === '' || content.trim() === '') {
      setErrorMessage('Title and content cannot be empty.');
      return;
    }

    setIsLoading(true);

    firestore()
      .collection('posts')
      .add({
        title,
        content,
        // additional data like userID, timestamp, etc.
      })
      .then(() => {
        setIsLoading(false);
        Alert.alert('Post created!', 'Your post has been successfully created.');
        navigation.goBack(); // Navigate back or to a specific screen
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage('An error occurred while creating the post. Please try again.');
        // You could also log the error for debugging purposes
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
      <TextInput placeholder="Title" onChangeText={setTitle} value={title} style={{ width: '100%', borderBottomWidth: 1 }} />
      <TextInput placeholder="Content" onChangeText={setContent} value={content} multiline style={{ width: '100%', borderBottomWidth: 1, marginTop: 20 }} />
      <TouchableOpacity onPress={handleCreatePost} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10 }} disabled={isLoading}>
        <Text style={{ color: 'white' }}>{isLoading ? 'Creating...' : 'Create Post'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostCreationScreen;
