import { supabase } from "../supabaseSettings";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Archetype {
  id: string;
  slug: string;
  name: string;
  numDecks: number;
  craftId: number;
}

export interface CardBreakdown {
  id: number;
  name: string;
  total: number;
}

export async function getTopArchetypes(n = 5): Promise<Archetype[]> {
  // const {data, error} = await supabase.from('archetypes_with_decks')
  //   .select().limit(5);

  // if(error) return null;

  // return data;

  const rawQuery = await prisma.$queryRaw<Archetype[]>`SELECT 
  "Archetype".id, slug, "Archetype".name, "Archetype"."craftId", COUNT(*) as "numDecks" FROM "Archetype"
  JOIN "Deck" on "Deck"."archetypeId" = "Archetype".id GROUP BY "Archetype".name, slug, "Archetype".id
  ORDER BY "numDecks" DESC LIMIT 5`;

  return rawQuery;
}

export async function getArchetypesByCraft(craft_id: number): Promise<Archetype[]> {

  const {data, error} = await supabase.from('archetypes_with_decks')
    .select().eq('craft_id', craft_id);

  if(error) return null;

  return data;
}

export async function getArchetypeBySlug(slug: string): Promise<Archetype> {
  
  slug = slug.toLowerCase();
  const {data, error} = await supabase.from('archetypes_with_decks').select()
    .eq('slug', slug).single();

  if(error) return null;

  return data;
}

export async function getArchetypeCardsBreakdown(id: number) {

  const {data, error} = await supabase.from('archetype_cards_total')
    .select('id, name, total').eq('archetype_id', id).limit(10);

  if(error) return null;

  return data;
}
const archetypeBucket = `https://ik.imagekit.io/svmaster/assets/`

export async function getAllArchetypes() {
  const archetypes = await prisma.archetype.findMany();

  return archetypes.map(arc => ({
    name: arc.name,
    slug: arc.slug,
    imageURL: `${archetypeBucket}${arc.slug}.png`,
    archetype_id: arc.id,
    craft_id: arc.craftId
  }));
}

export async function getAllCrafts() {
  const crafts = await prisma.craft.findMany({where: {id: {gt: 0}}});

  return crafts.map(d => ({...d, imageURL: `${archetypeBucket}${d.name.toLowerCase()}.png`}));
}