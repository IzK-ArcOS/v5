<script lang="ts">
  import type { App, Process } from "../../../ts/applogic/interface";
  import { getWindow } from "../../../ts/applogic/store";
  import AppSvelte from "./App.svelte";
  import Branch from "./Branch.svelte";
  import OverlayApp from "./OverlayApp.svelte";

  export let proc: Process;

  export let top = false;

  export let error = false;
</script>

{#if proc}
  <div class:indent={!top}>
    <AppSvelte {proc} {error} />
    {#if proc.children}
      {#each Object.entries(proc.children) as [_, childProc]}
        <Branch proc={childProc} />
      {/each}
    {/if}
    {#if proc.overlayProcesses}
      {#each Object.entries(proc.overlayProcesses) as [id, overlay]}
        <OverlayApp overlayProcess={overlay} parentProc={proc} {id} />
      {/each}
    {/if}
  </div>
{/if}
