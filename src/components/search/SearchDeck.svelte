<script lang="ts">
  import {DeckDetails, SearchResultDeck} from '../../interfaces'
  export let deck: DeckDetails;
  const getLink = d => `/deck/view/${d}`
  const capitalize = (name: string) => name.split(' ').map(n => n[0].toUpperCase() + n.substring(1)).join(' ')
  
  const getPlace = (score: number) => {
  
    if(score == 101) return "1st Place";
    if(score == 102) return "2nd Place";
    if(score == 103) return "Top 4";
    if(score == 116) return "Top 16";
    if(score == 6) return "1st Place";
    if(score == 3) return "2nd Place";
    if(score == 4 || score == 1.5) return "Top 16";
    return "Tournament";
  }
</script>

<a href={getLink(deck.deck_id)}
  class="relative p-1 mb-px transition duration-300 group flex items-center w-full bg-black/10 hover:bg-black/[.12]">
  <img src={deck.imageURL} class="w-16 aspect-square object-cover rounded-lg" alt={deck.player_name} />
  <div class="ml-3">
    <h2 class="text-md font-heading text-secondary/70">{deck.archetype_name}</h2>
    {#if deck.player_name}<p class="text-xs text-secondary/40">{deck.player_name}</p>{/if}
  </div>
  <div class="absolute top-0 right-0 rounded-bl-md bg-yellow-500 p-1 text-white text-xs">{getPlace(deck.score)}</div>
</a>
