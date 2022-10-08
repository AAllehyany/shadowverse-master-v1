import {db, auth} from '../firebaseSettings';

import { ArchetypeData, DeckData } from './interfaces';
import { supabase } from './supabaseSettings';

const archetypeBucket = `https://ik.imagekit.io/svmaster/assets/`


export async function getTopArchetypesSupa(n = 5) {
  
  const {data, error} = await supabase.rpc('get_top_archetypes').limit(n);
  
  if(error) {
    console.log(error);
    return;
  }

  return data.map(d => ({
    name: d.archetype_name,
    slug: d.slug,
    imageURL: `${archetypeBucket}${d.slug}.png`,
    archetype_id: d.archetype_id
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
    imageURL: `${archetypeBucket}${d.slug}.png`,
    archetype_id: d.archetype_id
  }));
}

export async function getTotalArchetypeDecks(archetype_id) {
  const {data, error} = await supabase.rpc('get_top_archetypes').match({
    archetype_id: archetype_id
  }).single();

  return data;
}

export async function getDecks(page = 0) {

  const range = getPagination(page, 24);
  const {data, error} = await supabase.from('decks')
    .select(`
      deck_link,
      archetype:archetype_id (name, slug)
    `).eq('format', 3).order('created_at', {ascending: false}).range(range.from, range.to);

  if(data == null) return [];
  return data.map(deck => ({
    archetype: deck.archetype.name,
    imageURL: `${archetypeBucket}${deck.archetype.slug}.png`,
    deckLink: `https://shadowverse-portal.com/deck/${deck.deck_link}`,
    player: "unkown"
  }));

  
}

export async function getTopArchetypeId() {
  const {data, error} = await supabase.rpc('get_top_archetypes').select('*  ').limit(1).single();

  if(error) console.log(error);

  return data;
}

export async function getDeckHighlight() {

  const topArchetype = await getTopArchetypeId();
  if(topArchetype == null) return null;

  const {data, error} = await supabase.from('decks').select('id, deck_link').order('created_at', {ascending: false})
      .eq('archetype_id', topArchetype.archetype_id).limit(1).single();

  const deckList = await viewDeckList(data.id, data.deck_link);

  return {archetype: topArchetype, deckList};
}

export const getPagination = (page, size) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
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
  
  const result = data.map(d => ({...d, imageLink: `https://ik.imagekit.io/svmaster/tr:w-150/card_frames/${d.card_id}.png`}));
  
  return {deckLink, list: result};
}

export async function getTopArchetypeCards(archetype_id: number) {

  const {data, error} = await supabase.rpc("top_cards", {
    arc_id: archetype_id
  }).limit(10);
  const deckCount = await countArchetypeDecks(archetype_id);
  if(error) console.log(error);

  const result = data.map(d => ({...d, average: Math.ceil(parseInt(d.total) / deckCount)}));

  return result;
}


export async function getSampleArchetypeList(archetype_id: number) {

  const {data, error} = await supabase.from('decks')
    .select('id, deck_link').eq('archetype_id', archetype_id).order('created_at', { ascending: false})
    .limit(3);

  if(error) console.log(error);

  return Promise.all(data.map(d => viewDeckList(d.id, d.deck_link)))
}

export async function getDecksByCard(cardName: string) {

  const {data, error} = await supabase.from('rotation_decks')
  .select()
  .ilike('name', `%${cardName}%`)

  if(error) console.log(error);

  return data.map(d => ({slug: d.slug, link: d.deck_link, cardId: d.card_id, imageURL: `${archetypeBucket}${d.slug}.png`}));
}