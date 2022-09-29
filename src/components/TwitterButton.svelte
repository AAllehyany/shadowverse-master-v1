<script>
    import { twitterPopUpLogin } from '../auth';
  import svgTwitter from '../twitter-white.svg'
  
  function twitterLogin() {
    twitterPopUpLogin()
      .then(result => console.log(result))
      .catch(err => console.error(err))
  }

</script>
<button on:click={twitterLogin} class="h-8 flex justify-center items-center px-3 text-medium bg-blue-400 hover:bg-blue-600 text-white ml-2 rounded-md">
  <img src={svgTwitter} alt="twitter-logo" class="fill-current h-4 mr-1" />
  <span class="block ml-1">login</span>
</button>