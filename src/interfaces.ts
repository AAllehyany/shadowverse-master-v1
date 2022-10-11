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
}