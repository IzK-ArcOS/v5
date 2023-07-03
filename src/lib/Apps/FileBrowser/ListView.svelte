<script lang="ts">
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import type {
    PartialUserDir,
    PartialArcFile,
  } from "../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserRefreshing,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import type { Process } from "../../../ts/applogic/interface";
  import Spinner from "../../Spinner.svelte";
  import Dir from "./ListView/Dir.svelte";
  import File from "./ListView/File.svelte";
  import TopRow from "./ListView/TopRow.svelte";

  export let files: PartialArcFile[] = [];
  export let dirs: PartialUserDir[] = [];
  export let process: Process;
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
  <div class="listview">
    <TopRow />
    <div class="items">
      {#each dirs as dir}
        <Dir {dir} />
      {/each}
      {#each files as file}
        <File {file} {process} />
      {/each}
    </div>
  </div>
{/if}
