<script lang="ts">
  export let stay: boolean;
</script>

<span class="keep-loggedin-wrapper">
  <input type="checkbox" id="rememberme" bind:value={stay} />
  <label for="rememberme">Stay logged in</label>
</span>
