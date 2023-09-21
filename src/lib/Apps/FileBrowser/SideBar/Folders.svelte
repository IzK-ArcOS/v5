<script lang="ts">
  import {
    getDirectory,
    sortDirectories,
  } from "../../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../../ts/api/interface";
  import { FileBrowserDirContents } from "../../../../ts/applogic/apps/FileBrowser/main";
  import Folder from "./Folder.svelte";

  let folders: PartialUserDir[] = [];

  FileBrowserDirContents.subscribe(async (v) => {
    folders = sortDirectories(
      ((await getDirectory("./")) as UserDirectory).directories
    );
  });
</script>

<div class="dirs">
  {#each folders as folder}
    <Folder {folder} />
  {/each}
</div>
