<script lang="ts">
  import type { App } from "$$ts/applogic/interface";
  import { WindowStore } from "$$ts/applogic/store";
  import SvelteMarkdown from "svelte-markdown";
  import "@css/desktop/apps/markdownviewer.css";

  export let app: App;

  let md = "";

  WindowStore.subscribe(() => {
    if (!app.openedFile || !app.openedFile.mime.startsWith("text/")) return;

    md = new TextDecoder().decode(app.openedFile.data);
  });
</script>

<SvelteMarkdown source={md} />
