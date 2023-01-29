<script lang="ts">
  import "../../css/desktop/apps/textview.css";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore } from "../../ts/applogic/store";

  export let app: App;

  let fileContents = "";

  WindowStore.subscribe(() => {
    if (!app.openedFile) return (fileContents = "");

    fileContents = new TextDecoder().decode(app.openedFile.data);
  });
</script>

{#if app.openedFile}
  <textarea value={fileContents} spellcheck={false} />
{/if}
