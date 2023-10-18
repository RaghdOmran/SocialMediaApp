import { db } from './firebase'; // Import the Firestore instance

// Function to fetch user posts from Firestore
export const getUserPosts = async (userId) => {
  try {
    const userPostsCollection = await db.collection('posts').where('userId', '==', userId).get();
    const userPosts = userPostsCollection.docs.map(doc => doc.data());
    return userPosts; // Array of user post objects
  } catch (error) {
    console.error('Error fetching user posts', error.message);
  }
};

// Function to create a new post in Firestore
export const createUserPost = async (userId, postData) => {
  try {
    const postRef = db.collection('posts').doc();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp(); // Firestore server timestamp

    const newPost = {
      postId: postRef.id, // Automatically generated ID
      userId,
      createdAt: timestamp,
      ...postData
    };

    await postRef.set(newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating new post', error.message);
  }
};
