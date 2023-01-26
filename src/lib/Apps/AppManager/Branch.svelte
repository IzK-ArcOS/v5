<script lang="ts">
  import { isOpened } from "../../../ts/applogic/checks";
  import type { App } from "../../../ts/applogic/interface";
  import { getWindow } from "../../../ts/applogic/store";
  import AppSvelte from "./App.svelte";
  import Branch from "./Branch.svelte";
  import OverlayApp from "./OverlayApp.svelte";

  export let window: App;
  export let top = false;

  export let error = false;
</script>

{#if window}
  <div class:indent={!top}>
    <AppSvelte app={window} {error} />
    {#if window.children}
      {#each Object.keys(window.children) as child}
        <Branch window={getWindow(child)} />
      {/each}
    {/if}
    {#if window.overlays}
      {#each Object.entries(window.overlays) as overlay}
        <OverlayApp overlay={overlay[1]} parent={window} id={overlay[0]} />
      {/each}
    {/if}
  </div>
{/if}
