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
  import { SettingsPages } from "../../../../ts/applogic/apps/SettingsApp/store";
  import DirLink from "./RightPane/DirLink.svelte";
  import SettingsLink from "./RightPane/SettingsLink.svelte";

  let dirs: PartialUserDir[] = [];

  FileBrowserDirContents.subscribe(async () => {
    (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    dirs = sortDirectories(
      ((await getDirectory("./")) as UserDirectory).directories
    );
  });
</script>

<div class="right">
  {#each dirs as dir}
    <DirLink {dir} />
  {/each}
</div>
