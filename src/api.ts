import {db, auth} from '../firebaseSettings';

import {addDoc, collection, getDocs,limit,serverTimestamp, query, orderBy, where, getDoc, doc} from "firebase/firestore";
import { ArchetypeData, DeckData } from './interfaces';
import { supabase } from './supabaseSettings';

const archetypeBucket = `https://s3.ca-central-1.wasabisys.com/shadow-master/archetypes/`


export async function createNewDeck(deckLink: string, clan: string, archetype: string) {

  const postedCollection = collection(db, 'decks');
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

  const postedCollection = collection(db, 'decks');
  const allDecks = await getDocs(postedCollection);

  let result = [];

  allDecks.forEach(doc => {
    result.push(doc.data());
  })

  return result;
}

export async function getAllDecksByCraft(craft: string) {
  const postedCollection = collection(db, 'decks');
  const recentDecks = await getDocs(query(postedCollection, where('craft', '==', craft.toLowerCase())));
  let result = [];

  recentDecks.forEach(doc => {
    result.push(doc.data());
  })

  return result;
}

export async function getRecentCommunityDecks() {
  const postedCollection = collection(db, 'decks');
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

export async function getTopArchetypesSupa() {
  
  const {data, error} = await supabase.rpc('get_top_archetypes').limit(5);
  
  if(error) {
    console.log(error);
    return;
  }

  return data.map(d => ({
    name: d.archetype_name,
    slug: d.slug,
    imageURL: `${archetypeBucket}${d.slug}.png`
  }));
}

export async function getAllArchetypes() {
  
  const {data, error} = await supabase.rpc('get_top_archetypes');
  
  if(error) {
    console.log(error);
    return;
  }

  return data.map(d => ({
    name: d.archetype_name,
    slug: d.slug,
    imageURL: `${archetypeBucket}${d.slug}.png`
  }));
}

export async function getTotalArchetypeDecks(archetype_id) {
  const {data, error} = await supabase.rpc('get_top_archetypes').match({
    archetype_id: archetype_id
  }).single();

  console.log(data);
}

export async function getNewDecks() {

  const {data, error} = await supabase.from('decks')
    .select(`
      deck_link,
      archetype:archetype_id (name, slug)
    `).order('created_at', {ascending: false}).limit(12);

  return data.map(deck => ({
    archetype: deck.archetype.name,
    imageURL: `${archetypeBucket}${deck.archetype.slug}.png`,
    deckLink: `https://shadowverse-portal.com/deck/${deck.deck_link}`,
    player: "unkown"
  }));

  
}

export async function getArchetypeBySlug(slug: string) {

  const {data, error} = await supabase.from('archetypes').select(`
    name, id, slug,
    craft:craft_id (name, id)`).match({
    slug: slug.toLowerCase()
  }).single();

  if(error) {
    console.log(error)
    return null;
  }

  const totalDecks = await countArchetypeDecks(data.id);
  const craftDecks = await countCraftDecks(data.craft.id);
  const percentage = craftDecks > 0 ? totalDecks/craftDecks : 0;

  const result = {
    id: data.id,
    slug: data.slug,
    name: data.name,
    craft: data.craft.name,
    totalDecks: totalDecks,
    imageURL: `${archetypeBucket}${data.slug}.png`,
    craftTotal: craftDecks,
    percentage: Math.round(percentage*100)
    
  }

  return result;
}

export async function countArchetypeDecks(archetype_id: number) {

  const {data, error, count} = await supabase.from('decks')
    .select('id', {count: 'exact'})
    .match({archetype_id: archetype_id});

    if(error) {
      console.log(error);
      return null;
    }

    return count || 0;
}

export async function countCraftDecks(craft_id: number) {
  const {data, error, count} = await supabase.from('decks')
    .select('id', {count: 'exact'})
    .match({craft_id: craft_id});

    if(error) {
      console.log(error);
      return 0;
    }

    return count || 0;
}

export async function viewDeckList(deckid: number, deckLink = "") {

  const {data, error} = await supabase
    .from('deck_lists_view')
    .select('*')
    .eq('deck_id', deckid)
    .order('cost')
    .order('copies', {ascending: false})
    .order('name');

  if(error) console.log(error);
  
  const result = data.map(d => ({...d, imageLink: `https://ik.imagekit.io/svmaster/tr:w-150/cards/${d.card_id}.png`}));
  console.log(data)
  return {deckLink, list: result};
}

export async function getTopArchetypeCards(archetype_id: number) {

  const {data, error} = await supabase.rpc("top_cards", {
    arc_id: archetype_id
  }).limit(10);
  const deckCount = await countArchetypeDecks(archetype_id);
  if(error) console.log(error);

  const result = data.map(d => ({...d, average: Math.ceil(parseInt(d.total) / deckCount)}));

  console.log(result);
  return result;
}


export async function getSampleArchetypeList(archetype_id: number) {

  const {data, error} = await supabase.from('decks')
    .select('id, deck_link').eq('archetype_id', archetype_id).order('created_at', { ascending: false})
    .limit(3);

  if(error) console.log(error);

  return Promise.all(data.map(d => viewDeckList(d.id, d.deck_link)))
}