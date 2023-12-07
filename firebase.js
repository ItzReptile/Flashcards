// Import the functions you need from the SDKs you need
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkYt3rWtVLUodfVakskmoARQwUOFJSWRo",
  authDomain: "comment-4ae05.firebaseapp.com",
  projectId: "comment-4ae05",
  storageBucket: "comment-4ae05.appspot.com",
  messagingSenderId: "413579874130",
  appId: "1:413579874130:web:91e7f29cf7f35045b3748b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
