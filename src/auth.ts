import {auth, twitterProvider} from '../firebaseSettings';
import {onAuthStateChanged, signInWithPopup, signOut, TwitterAuthProvider} from 'firebase/auth';
import userStore from './userStore';
import { supabase } from './supabaseSettings';

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

export async function signInWithDiscord() {
  return supabase.auth.signIn({
    provider: 'discord'
  })
}

export async function listenToAuthState() {

  const user = supabase.auth.user();

  if(user) {
    userStore.set({loggedIn: true, user})
  }

  supabase.auth.onAuthStateChange((event, session) => {
    
    if(event == 'SIGNED_IN') userStore.set({
      loggedIn: true,
      user: session.user.user_metadata
    })

    if(event == 'SIGNED_OUT') userStore.set({
      loggedIn: false,
      user: null
    })
  })
}