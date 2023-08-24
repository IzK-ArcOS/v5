<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import "../../css/desktop/apps/markdownviewer.css";
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, WindowStore } from "../../ts/applogic/store";
  import Unreadable from "./MarkdownViewer/Unreadable.svelte";

  export let app: App;

  let md = "";
  let content = "";

  WindowStore.subscribe(() => {
    if (!app) return;

    const file = app.openedFile;

    if (!file || !file.mime.startsWith("text/")) return;

    md = new TextDecoder().decode(file.data);

    content = md;
  });
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
