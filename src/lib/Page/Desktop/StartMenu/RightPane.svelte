<script lang="ts">
  import {
    getDirectory,
    sortDirectories,
  } from "../../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../../ts/api/interface";
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import DirLink from "./RightPane/DirLink.svelte";

  let dirs: PartialUserDir[] = [];

  fbState.subscribe(async () => {
    dirs = sortDirectories(
      ((await getDirectory("./")) as UserDirectory).directories
    );
  });
</script>

<div class="right">
  {#each dirs as dir}
    <DirLink {dir} />
  {/each}

  {#if !dirs.length}
    <p class="none">No folders!</p>
  {/if}
</div>
