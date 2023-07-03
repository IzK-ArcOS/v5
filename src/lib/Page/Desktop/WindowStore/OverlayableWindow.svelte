<script lang="ts">
  import { onMount } from "svelte";
  import { generateOverlayCSS } from "../../../../ts/applogic/css";
  import type {
    OverlayableProcess,
    Process,
  } from "../../../../ts/applogic/interface";
  import { AppStore } from "../../../../ts/applogic/store";

  export let overlay: OverlayableProcess;
  export let process: Process;
  export let id: string;

  let show = false;
  let css = "";

  onMount(() => {
    css = generateOverlayCSS(overlay.overlayableApp);
  });

  AppStore.subscribe(() => {
    css = generateOverlayCSS(overlay.overlayableApp);

    show = process.overlayProcesses[id]
      ? process.overlayProcesses[id].show
      : false;
  });
</script>

{#if overlay && process && process.app}
  <div class="overlay-wrapper" class:show>
    <window
      class="window headless overlay"
      class:visible={show}
      style={css}
      {id}
    >
      <div class="body overlay">
        <svelte:component
          this={overlay.overlayableApp.content}
          {overlay}
          app={process.app}
          {id}
          parent={process}
        />
      </div>
    </window>
  </div>
{/if}
