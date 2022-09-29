export interface ArchetypeData {
  name: string;
  imageURL: string;
  slug: string;
}

export interface DeckData {
  archetype: string;
  imageURL: string;
  player: string;
  deckLink: string;
}