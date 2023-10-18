import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

const PostScreen = () => {
  const [post, setPost] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode
  const route = useRoute();
  const navigation = useNavigation();
  const { postId } = route.params; // getting postId from navigation

  useEffect(() => {
    if (postId) {
      firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const postData = documentSnapshot.data();
            setPost(postData);
            setNewTitle(postData.title); // Setting the current title in state
            setNewContent(postData.content); // Setting the current content in state
          }
        });
    }
  }, [postId]);

  const handleEditPost = () => {
    // Toggle the editing state to show/hide the form
    setIsEditing(true);
  };

  const handleSubmit = () => {
    // Validate the input fields
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Error', 'Title and content are both required.');
      return;
    }

    // Update the post in Firestore
    firestore()
      .collection('posts')
      .doc(postId)
      .update({
        title: newTitle,
        content: newContent,
      })
      .then(() => {
        Alert.alert('Post Updated', 'The post has been updated successfully!');
        setIsEditing(false);
        setPost({ ...post, title: newTitle, content: newContent }); // Update the local state
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
        console.error("Error updating document: ", error);
      });
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  // If in edit mode, render the form
  if (isEditing) {
    return (
      <View style={{ margin: 20 }}>
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Post Title"
          style={{ marginBottom: 20, borderBottomWidth: 1 }}
        />
        <TextInput
          value={newContent}
          onChangeText={setNewContent}
          placeholder="Post Content"
          multiline
          style={{ marginBottom: 20, borderBottomWidth: 1 }}
        />
        <Button title="Submit Changes" onPress={handleSubmit} />
        <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
      </View>
    );
  }

  // If not in edit mode, render the post content
  return (
    <View style={{ margin: 20 }}>
      <Text style={{ marginBottom: 10 }}>Title: {post.title}</Text>
      <Text style={{ marginBottom: 10 }}>Content: {post.content}</Text>
      <Button title="Edit Post" onPress={handleEditPost} />
    </View>
  );
};

export default PostScreen;
