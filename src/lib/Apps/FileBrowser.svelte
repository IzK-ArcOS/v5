<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/filebrowser.css";
  import { sortDirectories } from "../../ts/api/fs/directory";
  import { sortFiles } from "../../ts/api/fs/file";
  import type { PartialArcFile, PartialUserDir } from "../../ts/api/interface";
  import { defaultDirectory } from "../../ts/api/interface";
  import { fbClass, fbState } from "../../ts/applogic/apps/FileBrowser/main";
  import type { App } from "../../ts/applogic/interface";
  import { ScopedAppData, UserData } from "../../ts/userlogic/interfaces";
  import Bottom from "./FileBrowser/Bottom.svelte";
  import Home from "./FileBrowser/Home.svelte";
  import ListView from "./FileBrowser/ListView.svelte";
  import SideBar from "./FileBrowser/SideBar.svelte";
  import TileView from "./FileBrowser/TileView.svelte";
  import TopBar from "./FileBrowser/TopBar.svelte";

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

    const currentDir = $fbState.dirContents || defaultDirectory;

    files = currentDir.files;
    dirs = currentDir.directories;
  });

  fbState.subscribe((v) => {
    dirs = sortDirectories(v.dirContents.directories);
    files = sortFiles(v.dirContents.files);
  });
</script>

<TopBar bind:appdata {app} />
<SideBar />
<div class="content">
  {#if $fbState.home}
    <Home />
  {:else if tiledMode}
    <TileView {files} {dirs} />
  {:else}
    <ListView {files} {dirs} />
  {/if}
</div>
<Bottom />
