<script lang="ts">
  import {DeckDetails, SearchResultDeck} from '../../interfaces'
  export let deck: DeckDetails;
  const getLink = d => `https://shadowverse-portal.com/deck/${d}`
  const capitalize = (name: string) => name.split(' ').map(n => n[0].toUpperCase() + n.substring(1)).join(' ')
</script>

<a href={getLink(deck.deck_link)} target="_blank"
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
<!-- 
<a href={getLink(deck.link)} target="_blank"
  class="mb-2 transition duration-300 group flex items-center w-full h-[70px] rounded-lg overflow-hidden bg-accent/40 hover:bg-accent/20 px-1">
  <img src={deck.imageURL} alt={deck.slug} class=" w-[50px] aspect-square object-cover rounded-md">

  <div class="px-2 flex w-full justify-between items-center">
      <h2 class="text-white font-bold text-md font-heading">{capitalize(deck.slug.replaceAll('-',' '))}</h2>
  </div>
  <div class="flex h-full items-center w-10 ">
    <img src="https://ik.imagekit.io/svmaster/assets/tr:w-50/gm.png" class="w-8">
  </div>
</a> -->