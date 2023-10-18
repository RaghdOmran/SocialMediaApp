import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const currentUser = auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        displayName: currentUser.displayName,
        email: currentUser.email,
        // other info you want to display...
      });

      const subscriber = firestore()
        .collection('posts')
        .where('userId', '==', currentUser.uid)
        .onSnapshot(querySnapshot => {
          const posts = [];

          querySnapshot.forEach(documentSnapshot => {
            posts.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setUserPosts(posts);
        });

      return () => subscriber();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Text>No user is logged in</Text>;
  }

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>User Profile</Text>
      <Text>Name: {userInfo?.displayName}</Text>
      <Text>Email: {userInfo?.email}</Text>
      {/* Render more user info here */}

      <Text style={{ fontSize: 18, marginTop: 20 }}>My Posts</Text>
      {userPosts.map((post) => (
        <TouchableOpacity
          key={post.key}
          onPress={() => navigation.navigate('PostScreen', { postId: post.key })}
          style={{ padding: 10, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 16 }}>{post.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileScreen;
