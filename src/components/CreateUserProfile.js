import { db } from './firebase'; // Import the Firestore instance

// Function to create a user profile document
export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Getting a reference to the place in the database where a user profile might be
  const userRef = db.doc(`users/${userAuth.uid}`);

  // Go and fetch the document from that location
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return userRef;
};
