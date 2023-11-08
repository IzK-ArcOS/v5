<script lang="ts">
  import type { App } from "../../../../../ts/applogic/interface";
  import type { AppRuntime } from "../../../../../ts/applogic/runtime/main";
  import OverlayableErrorWindow from "../OverlayableErrorWindow.svelte";
  import OverlayableWindow from "../OverlayableWindow.svelte";

  export let app: App;
  export let runtime: AppRuntime;
</script>

{#if app && app.overlays && (!app.runtime ? true : runtime)}
  {#each Object.entries(app.overlays) as overlay}
    <OverlayableWindow {runtime} {app} overlay={overlay[1]} id={overlay[0]} />
  {/each}
{/if}

{#if app && app.errorOverlays}
  {#each app.errorOverlays as error}
    <OverlayableErrorWindow {error} {app} />
  {/each}
{/if}
