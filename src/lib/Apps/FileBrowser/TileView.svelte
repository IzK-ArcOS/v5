<script lang="ts">
  import "../../../css/desktop/apps/filebrowser/tile.css";
  import type {
    PartialUserDir,
    PartialArcFile,
  } from "../../../ts/api/interface";
  import { FileBrowserRefreshing } from "../../../ts/applogic/apps/FileBrowser/main";
  import type { Process } from "../../../ts/applogic/interface";
  import Spinner from "../../Spinner.svelte";
  import Dir from "./TileView/Dir.svelte";
  import File from "./TileView/File.svelte";

  export let files: PartialArcFile[] = [];
  export let dirs: PartialUserDir[] = [];
  export let process: Process;

  files;
  dirs;
</script>

{#if !dirs.length && !files.length}
  {#if $FileBrowserRefreshing}
    <div class="loading">
      <div class="loading-inner">
        <Spinner height={32} />
        <p class="caption">Reading items...</p>
      </div>
    </div>
  {:else}
    <div class="nofiles">This folder is empty.</div>
  {/if}
{:else}
  <div class="tileview">
    {#if dirs.length}
      <div class="folders">
        {#each dirs as dir}
          <Dir {dir} />
        {/each}
      </div>
    {/if}
    {#if files.length}
      <div class="files">
        {#each files as file}
          <File {file} {process} />
        {/each}
      </div>
    {/if}
  </div>
{/if}
