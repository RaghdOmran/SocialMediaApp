import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .onSnapshot(querySnapshot => {
        const posts = [];

        querySnapshot.forEach(documentSnapshot => {
          posts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPosts(posts);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PostScreen', { postId: item.key })}
      style={{ padding: 20, borderBottomWidth: 1 }}
    >
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      style={{ margin: 10 }}
    />
  );
};

export default HomeScreen;
