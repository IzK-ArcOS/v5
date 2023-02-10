<script lang="ts">
  import { getDirectory } from "../../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../../ts/api/interface";
  import { ConnectedServer } from "../../../../ts/api/main";
  import { FileBrowserDirContents } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { SettingsPages } from "../../../../ts/applogic/apps/SettingsApp/store";
  import DirLink from "./RightPane/DirLink.svelte";
  import SettingsLink from "./RightPane/SettingsLink.svelte";

  let dirs: PartialUserDir[] = [];

  FileBrowserDirContents.subscribe(async () => {
    if (!$ConnectedServer) return (dirs = []);

    dirs = ((await getDirectory("./")) as UserDirectory).directories;
  });
</script>

<div class="right">
  {#if $ConnectedServer}
    {#each dirs as dir}
      <DirLink {dir} />
    {/each}
  {:else}
    {#each SettingsPages as page}
      <SettingsLink {page} />
    {/each}
  {/if}
</div>
