<script>
  import { onMount } from 'svelte';
  import { authState } from '../auth';
  import user from '../userStore';
  import TwitterButton from './TwitterButton.svelte';
  import User from './User.svelte';
  

  onMount(() => {
    authState();

  })
</script>

{#if $user && $user.loggedIn}
  <User user={$user.user} />
{:else}
  <TwitterButton />
{/if}