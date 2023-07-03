<script lang="ts">
  import "../../css/desktop/apps/imageviewer.css";
  import type { App, Process } from "../../ts/applogic/interface";
  import { AppStore } from "../../ts/applogic/store";

  export let process: Process;

  let url = "";

  AppStore.subscribe(() => {
    if (!process.openedFile) return (url = "");

    const blob = new Blob([new Uint8Array(process.openedFile.data)], {
      type: process.openedFile.mime,
    });

    url = URL.createObjectURL(blob);
  });
</script>

{#if process.openedFile && url}
  <img
    src={url}
    alt={process.openedFile.name}
    data-caller="output"
    data-path={process.openedFile.path}
  />
{/if}
