<script>
// import {createNewDeck} from '../api'
    import { supabase } from '../supabaseSettings';
  let deckCode;
  let deckName;
  let username;
  let errors = null;
  let success = false;
  let loading = false;
  let deckId = 0;
  async function handleSubmit() {

    success = false;
    loading = true;

    // fetch deck from deck code
    try {
      if(deckCode.length == 4) {
        const {data, error} = await supabase.functions.invoke('insert-deck', {
          body: JSON.stringify({deckCode}),

        })

        if(data) {
          deckId = data.deckId;
          success = true;
        }


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
  <form class="mt-10 px-10" on:submit|preventDefault={handleSubmit} >
    <div>
      <label for="deck-code" class="text-white mb-2 block text-md">Enter the deck code:</label>
      <input bind:value={deckCode} type="text" class="w-44 p-2 border border-accent outline-none rounded-md" id="deck-code" placeholder="XXXX">
    </div>
    <div class="">
      {#if errors}
        <span class="text-red-500 text-md">{errors}</span>
      {/if}
    </div>
    <div class="mt-5">
      <button class="bg-gray-500 text-white text-lg h-10 px-2 rounded-md
      hover:bg-accent focus:bg-accent" type="submit">Submit</button>
    </div>
  </form>
{/if}

{#if loading}
  <p class="text-lg text-white text-center">Currently trying to add deck...</p>
{/if}

{#if success}
  <span class="text-green-500 text-sm mt-2 px-3 text-center">
    Deck has been added successfully. You can view it <a href={`/deck/view/${deckId}`}>here.</a>
  </span>
{/if}