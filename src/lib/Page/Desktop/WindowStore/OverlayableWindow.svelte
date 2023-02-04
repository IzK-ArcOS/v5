<script lang="ts">
  import { onMount } from "svelte";
  import { generateOverlayCSS } from "../../../../ts/applogic/css";
  import type { App, OverlayableApp } from "../../../../ts/applogic/interface";
  import { WindowStore } from "../../../../ts/applogic/store";

  export let overlay: OverlayableApp;
  export let app: App;
  export let id: string;

  let show = false;
  let css = "";

  onMount(() => {
    css = generateOverlayCSS(overlay);
  });

  WindowStore.subscribe(() => {
    css = generateOverlayCSS(overlay);

    show = app.overlays[id] ? app.overlays[id].show : false;
  });
</script>

{#if overlay && app}
  <div class="overlay-wrapper" class:show>
    <window
      class="window headless overlay"
      class:visible={show}
      style={css}
      {id}
    >
      <div class="body overlay">
        <svelte:component this={overlay.content} {overlay} {app} {id} />
      </div>
    </window>
  </div>
{/if}
