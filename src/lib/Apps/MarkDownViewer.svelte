<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import "../../css/desktop/apps/markdownviewer.css";
  import type { App, Process } from "../../ts/applogic/interface";
  import Unreadable from "./MarkdownViewer/Unreadable.svelte";

  export let process: Process;
</script>

{#if process}
  {#if process.openedFile}
    <div class="markdownrenderer">
      <SvelteMarkdown
        source={new TextDecoder().decode(process.openedFile.data)}
      />
    </div>
  {:else}
    <Unreadable />
  {/if}
{/if}
