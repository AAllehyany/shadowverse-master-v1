<script>
    import modalStore from "../../modalStore";


  
  export let card;

  async function handleClick() {
    modalStore.set({open: true, card})
    
  }
</script>

<div class="relative w-full aspect-square h-full" on:click={handleClick}>
<img src={`https://ik.imagekit.io/svmaster/cards/tr:w-150/${card.id}.png`} 
class="rounded-lg w-full object-cover aspect-square h-full absolute" alt={card.id} >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black/70 hover:text-black cursor-pointer absolute bottom-px right-px">
  <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clip-rule="evenodd" />
</svg>
</div>