<script lang="ts">

  export let hash: string;

  let generating = false;
  let codeResult = "";
  let error = null;
  const generateCode = async () => {

    try {
      generating = true;
      const res = await fetch('/codes/' + hash);
      const json = await res.json();
      console.log(json)
      if(json.code) {
        codeResult = json.code;
      } else {
        error ="Failed to generate deck code"
      }
    } catch(err) {
      error = "Failed to generate deck code."
      console.log(err)
    } finally {
      generating = false;
    }
  }
</script>

<div 
class="w-full bg-secondary p-3 rounded-b-md text-center font-bold text-sm text-primary flex items-center"
>
  {#if generating}<span class='text-sm'>Generating...</span>{/if}
  {#if codeResult == "" && !generating}<button on:click={generateCode}>Get Code</button>{/if}
  {#if codeResult != "" && error == null} Code: {codeResult} - Copy this to Shadowverse.{/if}
</div>
