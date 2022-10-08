<script>
  import modal from '../../searchModal'
  import {getDecksByCard} from '../../api'
  import SearchDeck from './SearchDeck.svelte';
  const getImage = id => (`https://ik.imagekit.io/svmaster/tr:w-200/card_frames/${id}.png`)
  
  
  let timer;
  let data = [];
	const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
      
      data = await getDecksByCard(v);
    
		}, 750);
	}

  function hideModal() {
    modal.set(false)
  }
</script>

{#if $modal}
<div class="fixed w-full h-full bg-black/80 z-50">
  <div id="modal">
    <div class="flex w-full items-end justify-end">
      <span class="text-red-500 hover:text-red-200 cursor-pointer" on:click={hideModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>        
      </span>
    </div>
    <h2 class="text-secondary text-md italic">Search for decks that contain a card</h2>
    <input 
    on:keyup={({ target: { value } }) => debounce(value)}
    type="text" class="w-full p-2 bg-primary/80 border border-secondary rounded-lg text-secondary text-sm">
    
    <div class="mt-2 p-1 overflow-y-auto max-h-[450px]">
      {#each data as deck}
        <SearchDeck deck={deck} />
      {/each}
    </div>
  </div>
</div>
{/if}

<style>
 #modal {
    top: 15%;
    left: 50%;
    translate: -50% -15%;
    @apply rounded-lg absolute bg-primary border border-secondary w-96 min-h-[500px] p-5;
  }
</style>