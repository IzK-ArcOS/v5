<script lang="ts">
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import {
    fbClass,
    FileBrowserCurrentDir,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import type { App } from "../../../ts/applogic/interface";
  import type { ScopedAppData } from "../../../ts/userlogic/interfaces";
  import AdressBar from "./PathCrumbs.svelte";
  import DeleteButton from "./TopBar/DeleteButton.svelte";
  import ParentDir from "./TopBar/ParentDir.svelte";
  import Views from "./TopBar/Views.svelte";

  export let appdata: ScopedAppData;
  export let app: App;
</script>

<div class="topbar">
  <ParentDir />
  <AdressBar />
  <div class="right">
    <DeleteButton />
    <Views bind:appdata bind:app />
  </div>
</div>
