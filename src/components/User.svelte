<script>
  import { userSignout } from "../auth";

  
  export let user;

  async function handleSignout() {
    await userSignout();
  }
</script>

<div class="flex items-center">
  <img src={user.photoURL} alt="profile" class="rounded-md w-8 h-8">
  <div class="ml-2">
    <a href="#" class="block text-white font-bold text-sm hover:text-accent underline">{user.displayName}</a>
    <button on:click={handleSignout} class="bg-transparent text-red-500 text-xs">Logout</button>
  </div>
</div>