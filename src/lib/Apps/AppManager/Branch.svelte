<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import AppSvelte from "./App.svelte";
  import Branch from "./Branch.svelte";

  export let window: App;
  export let top = false;
</script>

<div class:indent={!top}>
  <AppSvelte app={window} />
  {#if window.children}
    {#each Object.values(window.children) as child}
      <Branch window={child} />
    {/each}
  {/if}
</div>
