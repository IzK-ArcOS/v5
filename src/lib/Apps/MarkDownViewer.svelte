<script lang="ts">
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, WindowStore } from "../../ts/applogic/store";
  import SvelteMarkdown from "svelte-markdown";
  import "../../css/desktop/apps/markdownviewer.css";
  import { TextEditorContent } from "../../ts/applogic/apps/TextEditor/main";

  export let app: App;

  let md = "";
  let content = "";

  WindowStore.subscribe(() => {
    if (!app) return;

    const file = app.openedFile;

    if (!file || !file.mime.startsWith("text/")) return;

    md = new TextDecoder().decode(file.data);

    content = app.openedFile ? md : $TextEditorContent;
  });

  TextEditorContent.subscribe(() => {
    content = app.openedFile ? md : $TextEditorContent;
  });
</script>

{#if app}
  <SvelteMarkdown
    source={content ||
      "### ⚠️ Can't display markdown\n\nNo file opened or the opened file is empty.\n"}
  />
{/if}
