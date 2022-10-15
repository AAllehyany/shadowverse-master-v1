import { supabase } from "../supabaseSettings";

export interface Archetype {
  id: number;
  slug: string;
  name: string;
  num_decks: number;
  craft_id: number;
}

export interface CardBreakdown {
  id: number;
  name: string;
  total: number;
}

export async function getTopArchetypes(n = 5): Promise<Archetype[]> {
  const {data, error} = await supabase.from('archetypes_with_decks')
    .select().limit(5);

  if(error) return null;

  return data;
}

export async function getArchetypesByCraft(craft_id: number): Promise<Archetype[]> {

  const {data, error} = await supabase.from('archetypes_with_decks')
    .select().eq('craft_id', craft_id);

  if(error) return null;

  return data;
}

export async function getArchetypeBySlug(slug: string): Promise<Archetype> {
  
  slug = slug.toLowerCase();
  const {data, error} = await supabase.from('archetypes').select()
    .eq('slug', slug).single();

  if(error) return null;

  return data;
}

export async function getArchetypeCardsBreakdown(id: number) {

  const {data, error} = await supabase.from('archetype_cards_total')
    .select('id, name, total').eq('archetype_id', id);

  if(error) return null;

  return data;
}