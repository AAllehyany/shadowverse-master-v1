<script lang="ts">
  import {SearchResultDeck} from '../../interfaces'
  export let deck: SearchResultDeck;
  const getLink = d => `https://shadowverse-portal.com/deck/${d}`
</script>

<a href={getLink(deck.link)} target="_blank"
  class="mb-2 transition duration-300 group flex items-center w-full h-[70px] rounded-lg overflow-hidden bg-accent/40 hover:bg-accent/20 px-1">
  <img src={deck.imageURL} alt={deck.slug} class=" w-[50px] aspect-square object-cover rounded-md">

  <div class="px-2 flex w-full justify-between items-center">
    <div>
      <h2 class="text-white font-bold text-md font-heading">{deck.slug.replaceAll('-',' ')}</h2>
    </div>
  </div>
  <!-- <div class="flex h-full items-center w-10 ">
    <img src="https://ik.imagekit.io/svmaster/assets/tr:w-50/gm.png" class="w-8">
  </div> -->
</a>