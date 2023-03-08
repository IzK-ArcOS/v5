<script lang="ts">
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, WindowStore } from "../../ts/applogic/store";
  import SvelteMarkdown from "svelte-markdown";
  import "../../css/desktop/apps/markdownviewer.css";
  import { TextEditorContent } from "../../ts/applogic/apps/TextEditor/main";
  import { closeFile } from "../../ts/api/fs/main";
  import { setTitleSuffix } from "../../ts/applogic/title";
  import Unreadable from "./MarkdownViewer/Unreadable.svelte";

  export let app: App;

  let md = "";
  let content = "";

  WindowStore.subscribe(() => {
    const textViewer = getWindow("TextEditor");

    if (!app) return;

    const file = app.openedFile;

    if (!file || !file.mime.startsWith("text/")) return;

    md = new TextDecoder().decode(file.data);

    content = app.openedFile ? md : $TextEditorContent;
  });
  /* 
  TextEditorContent.subscribe(() => {
    closeFile("MarkDownViewer");
    setTitleSuffix("", "MarkDownViewer");

    content = app.openedFile ? md : $TextEditorContent;
  }); */
</script>

{#if app}
  {#if content}
    <div class="markdownrenderer">
      <SvelteMarkdown source={content} />
    </div>
  {:else}
    <Unreadable />
  {/if}
{/if}
