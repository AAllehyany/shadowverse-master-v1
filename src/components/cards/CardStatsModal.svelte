<script>
  import modal from '../../modalStore'

  const getImage = id => (`https://ik.imagekit.io/svmaster/tr:w-200/card_frames/${id}.png`)
  const getPortalImage = id => (`https://shadowverse-portal.com/image/card/phase2/common/C/C_${id}.png`)
  const getPortalLink = id => (`https://shadowverse-portal.com/card/${id}`)

  function hideModal() {
    modal.set({open: false, card: null})
  }
</script>

{#if $modal && $modal.open}
<div class="fixed w-full h-full bg-black/90 z-50" on:click|stopPropagation={hideModal}>
  <div id="modal">
    <img src={getImage($modal.card.id)} class="rounded-lg w-48"/>
    <a target="_blank" href={getPortalLink($modal.card.id)} class="underline hover:text-primary/70 text-md font-heading text-primary mt-3 font-bold">{$modal.card.name}</a>

    <p class="text-sm font-heading text-primary mt-5 font-bold">Usage Breakdown:</p>
    <div class="flex items-center mt-2">
      <span class="bg-green-400 px-2 py-1 text-sm rounded-md text-white mr-3">average: {$modal.card.average}</span>
      <span class="bg-yellow-400 px-2 py-1 text-sm rounded-md text-white">total: {$modal.card.total}</span>
    </div>
    <button on:click={hideModal} class="absolute bottom-1 bg-red-800 px-4 py-2 text-white font-bold rounded-md">Close</button>
  </div>
</div>
{/if}

<style>
 #modal {
    top: 15%;
    left: 50%;
    translate: -50% -15%;
    @apply rounded-lg absolute bg-secondary w-[300px] min-h-[500px] py-5 flex items-center flex-col justify-center relative;
  }
</style>