import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey : "AIzaSyAviTAsMd7Vou-i7S0VuzmQe5iGbaFRVuI",
    authDomain : "book-santa-7f2f1.firebaseapp.com",
    projectId : "book-santa-7f2f1",
    storageBucket : "book-santa-7f2f1.appspot.com",
    messagingSenderId : "67259590335",
    appId : "1:67259590335:web:02fdfd61988cce9ddf480a"
  };
  // Initialize Firebase
  if(!firebase.apps.length)
  {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase.firestore();