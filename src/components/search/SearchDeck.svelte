<script lang="ts">
  import {DeckDetails, SearchResultDeck} from '../../interfaces'
  export let deck: DeckDetails;
  const getLink = d => `/deck/view/${d}`
  const capitalize = (name: string) => name.split(' ').map(n => n[0].toUpperCase() + n.substring(1)).join(' ')
</script>

<a href={getLink(deck.deck_id)}
  class="relative p-1 mb-px transition duration-300 group flex items-center w-full bg-black/10 hover:bg-black/[.12]">
  <img src={deck.imageURL} class="w-16 aspect-square object-cover rounded-lg" alt={deck.player_name} />
  <div class="ml-3">
    <h2 class="text-md font-heading text-secondary/70">{deck.archetype_name}</h2>
    {#if deck.player_name}<p class="text-xs text-secondary/40">{deck.player_name}</p>{/if}
  </div>
  {#if deck.deck_source}
  <div class="absolute top-0 right-0 rounded-bl-md bg-yellow-500 p-1 text-white text-xs">{deck.deck_source}</div>
  {/if}
</a>
