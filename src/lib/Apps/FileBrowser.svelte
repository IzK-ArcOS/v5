<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/filebrowser.css";
  import { sortDirectories } from "../../ts/api/fs/directory";
  import { sortFiles } from "../../ts/api/fs/file";
  import type { PartialArcFile, PartialUserDir } from "../../ts/api/interface";
  import { defaultDirectory } from "../../ts/api/interface";
  import {
    FileBrowserDirContents,
    FileBrowserHome,
    fbClass,
  } from "../../ts/applogic/apps/FileBrowser/main";
  import type { App } from "../../ts/applogic/interface";
  import { ScopedAppData, UserData } from "../../ts/userlogic/interfaces";
  import Bottom from "./FileBrowser/Bottom.svelte";
  import ListView from "./FileBrowser/ListView.svelte";
  import SideBar from "./FileBrowser/SideBar.svelte";
  import TileView from "./FileBrowser/TileView.svelte";
  import TopBar from "./FileBrowser/TopBar.svelte";
  import Home from "./FileBrowser/Home.svelte";

  let files: PartialArcFile[] = [];
  let dirs: PartialUserDir[] = [];
  let tiledMode = false;

  export let app: App;
  export let appdata: ScopedAppData;

  UserData.subscribe(() => {
    tiledMode = appdata.tiled as boolean;
  });

  onMount(async () => {
    await fbClass.refresh();

    const currentDir = $FileBrowserDirContents || defaultDirectory;

    files = currentDir.files;
    dirs = currentDir.directories;
  });

  FileBrowserDirContents.subscribe((v) => {
    dirs = sortDirectories(v.directories);
    files = sortFiles(v.files);
  });
</script>

<TopBar bind:appdata {app} />
<SideBar />
<div class="content">
  {#if $FileBrowserHome}
    <Home />
  {:else if tiledMode}
    <TileView {files} {dirs} />
  {:else}
    <ListView {files} {dirs} />
  {/if}
</div>
<Bottom />
