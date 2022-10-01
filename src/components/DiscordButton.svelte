<script>
  import { signInWithDiscord, twitterPopUpLogin } from '../auth';
import svgDiscord from '../discord-white.svg'

async function twitterLogin() {
  const result = await signInWithDiscord();
  console.log(result);
}

</script>
<button on:click={twitterLogin} class="transition duration-200 h-8 flex justify-center items-center px-3 text-medium bg-[#5865F2] hover:bg-[#5865F2]/90 text-white ml-2 rounded-md">
<img src={svgDiscord} alt="twitter-logo" class="fill-current h-4 mr-1" />
<span class="block ml-1">login</span>
</button>