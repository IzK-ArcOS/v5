<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../css/desktop/apps/filebrowser.css";
  import type { PartialUserDir, UserFile } from "../../ts/api/interface";
  import { defaultDirectory } from "../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDirContents,
  } from "../../ts/applogic/apps/FileBrowser/main";
  import { WindowStore } from "../../ts/applogic/store";
  import type { ScopedAppData } from "../../ts/userlogic/interfaces";
  import ListView from "./FileBrowser/ListView.svelte";
  import TileView from "./FileBrowser/TileView.svelte";

  let files: UserFile[] = [];
  let dirs: PartialUserDir[] = [];

  let tiledMode = false;

  export let appdata: ScopedAppData;

  WindowStore.subscribe(() => {
    tiledMode = appdata.tiled as boolean;
  });

  onMount(async () => {
    await fbClass.refresh();

    const currentDir = $FileBrowserDirContents || defaultDirectory;

    files = currentDir.files;
    dirs = currentDir.directories;
  });
</script>

<div class="sidebar" />
<div class="content">
  {#if tiledMode}
    <TileView {files} {dirs} />
  {:else}
    <ListView {files} {dirs} />
  {/if}
</div>
