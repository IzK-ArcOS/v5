<script lang="ts">
  export let username = "";
  export let password = "";

  export let loading: boolean;
</script>

<input type="text" placeholder="Username" class="field" bind:value={username} />
<input
  type="password"
  placeholder="Password"
  class="field"
  bind:value={password}
  disabled={loading}
/>
