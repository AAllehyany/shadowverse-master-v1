import {auth, twitterProvider} from '../firebaseSettings';
import {signInWithPopup, signOut, TwitterAuthProvider} from 'firebase/auth';

export function twitterPopUpLogin() {
  return signInWithPopup(auth, twitterProvider);
}

export async function userSignout() {
  return signOut(auth);
}