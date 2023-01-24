<script lang="ts">
  import { onMount } from "svelte";
  import { generateOverlayCSS } from "../../../../ts/applogic/css";
  import type { App, OverlayableApp } from "../../../../ts/applogic/interface";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { hideOverlay } from "../../../../ts/window/overlay";

  export let overlay: OverlayableApp;
  export let app: App;
  export let id: string;

  let show = false;
  let css = "";

  onMount(() => {
    css = generateOverlayCSS(overlay);

    console.debug(overlay, app);
  });

  WindowStore.subscribe(() => {
    css = generateOverlayCSS(overlay);

    show = app.overlays[id].show;
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
