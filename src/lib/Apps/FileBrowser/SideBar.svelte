<script lang="ts">
  import { getDirectory } from "../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../ts/api/interface";
  import { FileBrowserDirContents } from "../../../ts/applogic/apps/FileBrowser/main";
  import Folder from "./SideBar/Folder.svelte";
  import QuotaRenderer from "./SideBar/QuotaRenderer.svelte";

  let folders: PartialUserDir[] = [];

  FileBrowserDirContents.subscribe(async (v) => {
    folders = ((await getDirectory("./")) as UserDirectory).directories;
  });
</script>

<div class="sidebar">
  <div class="dirs">
    {#each folders as folder}
      <Folder {folder} />
    {/each}
  </div>
  <QuotaRenderer />
</div>
