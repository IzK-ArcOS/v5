<script lang="ts">
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import type { PartialUserDir, UserFile } from "../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserRefreshing,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import Spinner from "../../Spinner.svelte";
  import Dir from "./ListView/Dir.svelte";
  import File from "./ListView/File.svelte";
  import TopRow from "./ListView/TopRow.svelte";

  export let files: UserFile[] = [];
  export let dirs: PartialUserDir[] = [];
</script>

<div class="listview">
  <TopRow />
  <div class="items">
    {#each dirs as dir}
      <Dir {dir} />
    {/each}
    {#each files as file}
      <File {file} />
    {/each}
  </div>

  {#if !dirs.length && !files.length}
    {#if $FileBrowserRefreshing}
      <div class="center-flex">loading</div>
    {:else}
      No files!
    {/if}
  {/if}
</div>
