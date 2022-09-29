import {db, auth} from '../firebaseSettings';

import {addDoc, collection, getDocs,limit,serverTimestamp, query, orderBy, where} from "firebase/firestore";


export async function createNewDeck(deckLink: string, clan: string, archetype: string) {

  const postedCollection = collection(db, 'posted_decks');
  const user = auth.currentUser;
  return await addDoc(postedCollection, {
    deck_link: deckLink,
    created_at: serverTimestamp(),
    user_id: user ? user.uid : "0",
    user_name: user ? user.displayName : "unknown",
    archetype: archetype,
    craft: clan
  });
}

export async function getAllDecks() {

  const postedCollection = collection(db, 'posted_decks');
  const allDecks = await getDocs(postedCollection);

  let result = [];

  allDecks.forEach(doc => {
    result.push(doc.data());
  })

  return result;
}

export async function getAllDecksByCraft(craft: string) {
  const postedCollection = collection(db, 'posted_decks');
  const recentDecks = await getDocs(query(postedCollection, where('craft', '==', craft.toLowerCase())));
  let result = [];

  recentDecks.forEach(doc => {
    result.push(doc.data());
  })

  return result;
}

export async function getRecentCommunityDecks() {
  const postedCollection = collection(db, 'posted_decks');
  const recentDecks = await getDocs(query(postedCollection, limit(8)));
  let result = [];

  recentDecks.forEach(doc => {
    result.push(doc.data());
  })

  return result;
}

export async function getAllCrafts() {
  const craftsCollection = collection(db, 'crafts');
  const orderedCrafts = await getDocs(query(craftsCollection, orderBy('decks', 'desc')))
  let result = []

  orderedCrafts.forEach(doc => {
    result.push(doc.data())
  })

  return result;
}