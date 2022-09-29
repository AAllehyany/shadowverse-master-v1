import {auth, twitterProvider} from '../firebaseSettings';
import {onAuthStateChanged, signInWithPopup, signOut, TwitterAuthProvider} from 'firebase/auth';
import userStore from './userStore';

export function twitterPopUpLogin() {
  return signInWithPopup(auth, twitterProvider);
}

export async function userSignout() {
  return signOut(auth);
}

export async function authState() {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      userStore.set({loggedIn: true, user})
    } else {
      userStore.set({loggedIn: false, user: null})
    }
  })
}