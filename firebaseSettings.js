// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

import {getAuth, TwitterAuthProvider} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU0FydC7S5M0FZSLUqSsQ9fCCMdwCuE74",
  authDomain: "shadow-data-e90ca.firebaseapp.com",
  projectId: "shadow-data-e90ca",
  storageBucket: "shadow-data-e90ca.appspot.com",
  messagingSenderId: "732795720101",
  appId: "1:732795720101:web:9b4e430b1d379d05f7984c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const twitterProvider = new TwitterAuthProvider();
