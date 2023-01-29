<script lang="ts">
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import type { PartialUserDir, UserFile } from "../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import Dir from "./ListView/Dir.svelte";
  import File from "./ListView/File.svelte";

  export let files: UserFile[] = [];
  export let dirs: PartialUserDir[] = [];

  async function parentDir() {
    fbClass.goToDirectory(getParentDirectory($FileBrowserCurrentDir));
  }
</script>

<div class="listview">
  <button class="item" on:click={parentDir}>Parent</button>
  {#each dirs as dir}
    <Dir {dir} />
  {/each}
  {#each files as file}
    <File {file} />
  {/each}
</div>
