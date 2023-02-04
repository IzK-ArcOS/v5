<script lang="ts">
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, WindowStore } from "../../ts/applogic/store";
  import SvelteMarkdown from "svelte-markdown";
  import "../../css/desktop/apps/markdownviewer.css";
  import { TextEditorContent } from "../../ts/applogic/apps/TextEditor/main";

  export let app: App;

  let md = "";

  WindowStore.subscribe(() => {
    if (!app) return;

    const file = app.openedFile;

    if (!file || !file.mime.startsWith("text/")) return;

    md = new TextDecoder().decode(file.data);
  });
</script>

<SvelteMarkdown source={$TextEditorContent || md} />
