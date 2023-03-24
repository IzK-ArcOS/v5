<script lang="ts">
  import { onMount } from "svelte";

  export let stay: boolean;

  onMount(() => {
    stay = true;
  });
</script>

<span class="keep-loggedin-wrapper">
  <input type="checkbox" id="rememberme" bind:value={stay} />
  <label for="rememberme">Stay logged in</label>
</span>
