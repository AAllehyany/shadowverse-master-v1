export interface ArchetypeData {
  name: string;
  imageURL: string;
  slug: string;
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
  player: string;
  deckLink: string;
}