import { supabase } from "../supabaseSettings";

export interface FullDeckCardDetails {
  deck_link: string;
  deck_id: number;
  deck_source: string;
  player_name: string;
  deck_format: number;
  archetype_slug: string;
  archetype_name: string;
  archetype_id: number;
  card_id: number;
  card_name: string;
  copies: number;
  score: number;
  card_cost: number;
}

export interface DeckDetails {
  deck_id: number;
  card_id: number;
  archetype_id: number;

  deck_link: string;
  player_name: string;
  deck_source: string;
  deck_format: number;

  archetype_slug: string;
  archetype_name: string;

  card_name: string;
  copies: number;
  
}

export interface Deck {
  id: number;
  archetype_id: number;
  craft_id: number;
  deck_link: string;
  player_name: string;
  source: string;
  format: number;
}

export async function searchDecks(cardName: string): Promise<DeckDetails[]> {

  const {data, error} = await supabase.from('master_deck_details')
  .select()
  .ilike('card_name', `%${cardName}%`)
  .order('deck_source')

  if(error) return null;

  return data;
}

export async function getDeckDetails(deck_id: number): Promise<FullDeckCardDetails[]> {

  const {data, error} = await supabase.from('master_deck_details')
    .select().eq('deck_id', deck_id).order('card_cost').order('copies', {ascending: false});

  if(error) console.log(error);

  return data;
}

export async function getDecksByCraft(craft_id: number): Promise<Deck[]>{

  const {data, error} = await supabase.from('decks')
    .select().eq('craft_id', craft_id);

  if(error) return null;

  return data;
}