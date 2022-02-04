import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCC9G_uJTr1ztpmUWQP5iSquyg-W9UD2GQ",
  authDomain: "seast-redux.firebaseapp.com",
  projectId: "seast-redux",
  storageBucket: "seast-redux.appspot.com",
  messagingSenderId: "1038172925147",
  appId: "1:1038172925147:web:e5b6bd7cd3c7b5c6ab70fe",
};

export const createUserProfileDocument = async (userAuth, addtinionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtinionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
