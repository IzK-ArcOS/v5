<script lang="ts">
  import "../../css/desktop/apps/imageviewer.css";
  import { arrayToBlob } from "../../ts/api/fs/file/conversion";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";

  export let app: App;

  let url = "";

  WindowStore.subscribe(() => {
    if (!app.openedFile) return (url = "");

    const blob = arrayToBlob(app.openedFile.data, app.openedFile.mime);

    url = URL.createObjectURL(blob);
  });
</script>

{#if app.openedFile && url}
  <img
    src={url}
    alt={app.openedFile.name}
    data-contextmenu="output"
    data-path={app.openedFile.path}
  />
{/if}
