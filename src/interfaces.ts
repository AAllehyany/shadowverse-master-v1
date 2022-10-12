export interface ArchetypeData {
  name: string;
  imageURL: string;
  slug: string;
  archetype_id: number;
}

export interface SearchResultDeck {
  slug: string;
  link: string;
  cardId: number;
  imageURL: string;
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

  imageURL: string;
  
}

export interface ArchetypeBreakdown {
  name: string;
  imageURL: string;
  cards: object;
  decks: number;
}

export interface DeckData {
  archetype: string;
  imageURL: string;
  player_name: string;
  player_link: string;
  score: number;
  source: string;
  deckLink: string;
  archetypeSlug: string;
  id: number;
}

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