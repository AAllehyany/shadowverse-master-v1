<script>
  import {createNewDeck} from '../api'
  let deckLink;
  let deckName;
  let username;
  let errors = null;
  let success = false;
  let loading = false;
  async function submitNewDeck() {

    success = false;
    loading = true;

    // fetch deck from deck code
    try {
      if(deckLink.length == 4) {
        const response = await fetch(`codes/${deckLink}`);
        const json = await response.json();

        if(json.errors != null) {
          errors = "Failed to fetch deck code. Deck code might be invalid or expired."
          return;
        }

        const link = json.deckLink;
        await createNewDeck(link, json.craft, deckName, username);
        success = true
      } else {
        errors = "Please enter a 4 digits deck code."
      }
    } catch(e) {
      errors = "Failed to fetch deck code. Deck code might be invalid or expired."
    }

    loading=false;
  }
</script>
{#if !loading && !success}
  <form class="mt-8" on:submit|preventDefault={submitNewDeck}>

    <div>
      <label for="deck-name" class="text-white mb-2 block text-lg font-bold">
        Enter a name for your deck.
      </label>
      <input type="text" id="deck-name" 
        bind:value={deckName}
        placeholder="example: crystalize haven"
        class="block w-full text-xl bg-transparent border border-2 border-gray-300 rounded-md text-gray-300 p-2 outline-none
        focus:ring-accent focus:border-accent hover:border-gray-100" >      
    </div>
    <div class="mt-7">
      <label for="deck-link" class="text-white mb-2 block text-lg font-bold">
        4-Digit Deck Code
      </label>
      <input type="text" id="deck-link" 
        bind:value={deckLink}
        placeholder="XXXX"
        class="block w-full text-xl bg-transparent border border-2 border-gray-300 rounded-md text-gray-300 p-2 outline-none
        focus:ring-accent focus:border-accent hover:border-gray-100" >
      {#if errors != null}<span class="text-red-500 text-sm mt-2 px-3">{errors}</span>{/if}
      
    </div>

    <div class="mt-5">
      <button class="bg-gray-500 text-white font-bold text-lg px-5 py-3 rounded-md
      hover:bg-secondary focus:bg-secondary" type="submit">Submit Deck</button>
    </div>
  </form>
{/if}

{#if loading}
  <p class="text-lg text-white text-center">Currently trying to add deck...</p>
{/if}

{#if success}
  <p class="text-green-500 text-sm mt-2 px-3 text-center">Deck has been added successfully.</p>
{/if}