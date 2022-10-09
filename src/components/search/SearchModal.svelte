<script>
  import modal from '../../searchModal'
  import {getDecksByCard} from '../../api'
  import SearchDeck from './SearchDeck.svelte';

  let timer;
  let data = [];
	const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
      
      if(v != "") {
        data = await getDecksByCard(v);
      }
    
		}, 750);
	}

  function hideModal() {
    modal.set(false)
    data=[];
  }
</script>

{#if $modal}
<div class="fixed w-full h-full bg-black/80 z-50 p-2">
  <div id="modal">
    <div class="flex w-full items-center justify-between mb-2">
      <h2 class="text-secondary text-lg font-heading">Deck Search</h2>
      <span class="text-secondary hover:text-secondary/90 cursor-pointer" on:click={hideModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>        
      </span>
    </div>

    <div class="mt-3 relative">
      <div class="flex absolute inset-y-0 right-0 items-center pointer-events-none text-secondary pr-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clip-rule="evenodd" />
        </svg>        
      </div>
      <input 
        on:keyup={({ target: { value } }) => debounce(value)}
        placeholder="Card name..."
        type="text" class="w-full px-2 py-2 pr-10 bg-primary/80 border border-secondary rounded-lg text-secondary text-sm">
    </div>
    <div class="mt-2 overflow-y-auto h-96 px-1">
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
    @apply rounded-lg absolute bg-primary border border-secondary w-full max-w-sm py-1 mx-auto px-4;
  }
</style>