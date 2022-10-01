<script>
  import { userSignout } from "../auth";

  
  export let user;

  async function handleSignout() {
    await userSignout();
  }
</script>

<div class="flex items-center ml-2">
  <a href="#"><img src={user.picture} alt="profile" class="rounded-full w-8 h-8"></a>
</div>