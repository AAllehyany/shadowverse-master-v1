import {db, auth} from '../firebaseSettings';

import {addDoc, collection, getDocs,limit,serverTimestamp, query, orderBy, where, getDoc, doc} from "firebase/firestore";
import { ArchetypeData, DeckData } from './interfaces';

const archetypeBucket = `https://s3.ca-central-1.wasabisys.com/shadow-master/archetypes/`


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
  let result: DeckData[] = [];

  recentDecks.forEach(doc => {
    let d = doc.data();
    result.push({
      imageURL: `${archetypeBucket}${d.archetype.replaceAll('_', '-')}.png`,
      player: d.user_name,
      deckLink: `https://shadowverse-portal.com/deck/${d.deck_link}`,
      archetype: d.archetype.replaceAll('_', ' ')
    });
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

export async function getPopularArchetypes() {
  const archetypeCollection = collection(db, 'archetypes');
  const q = query(archetypeCollection, orderBy('decks', 'desc'), limit(5));

  let result: ArchetypeData[] = [];
  const archetypes = await getDocs(q);

  archetypes.forEach(doc => {
    let d = doc.data();

    result.push({
      imageURL: `${archetypeBucket}${d.slug}.png`,
      name: d.name,
      slug: d.slug
    })
  })

  return result;

}

export async function getArchetypeBySlug(slug: string) {

  const id = slug.toLowerCase().replaceAll('-', '_');
  const archetypeCollection = collection(db, 'archetypes');
  const archetypeRef = doc(archetypeCollection, id);
  const archetypeSnap= await getDoc(archetypeRef);
  
  if(!archetypeSnap.exists()) {
    return null;
  }

  return archetypeSnap.data();
}