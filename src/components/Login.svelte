<script>
  import { onMount } from 'svelte';
  import { authState, listenToAuthState } from '../auth';
  import user from '../userStore';
    import DiscordButton from './DiscordButton.svelte';
  import TwitterButton from './TwitterButton.svelte';
  import User from './User.svelte';
  

  onMount(() => {
    // authState();
    listenToAuthState();
  })
</script>

{#if $user && $user.loggedIn}
  <User user={$user.user} />
{:else}
  <DiscordButton />
{/if}