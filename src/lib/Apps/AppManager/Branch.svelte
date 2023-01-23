<script lang="ts">
  import { isOpened } from "../../../ts/applogic/checks";
  import type { App } from "../../../ts/applogic/interface";
  import { getWindow } from "../../../ts/applogic/store";
  import AppSvelte from "./App.svelte";
  import Branch from "./Branch.svelte";

  export let window: App;
  export let top = false;
</script>

<div class:indent={!top}>
  {#if isOpened(window.id)}
    <AppSvelte app={window} />
    {#if window.children}
      {#each Object.keys(window.children) as child}
        <Branch window={getWindow(child)} />
      {/each}
    {/if}
  {/if}
</div>
