<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import type { ScopedAppData } from "../../../ts/userlogic/interfaces";
  import AdressBar from "./PathCrumbs.svelte";
  import DeleteButton from "./TopBar/DeleteButton.svelte";
  import NewFolderButton from "./TopBar/NewFolderButton.svelte";
  import ParentDir from "./TopBar/ParentDir.svelte";
  import UploadFileButton from "./TopBar/UploadFileButton.svelte";
  import Views from "./TopBar/Views.svelte";

  export let appdata: ScopedAppData;
  export let app: App;
</script>

<div class="topbar">
  <ParentDir />
  <AdressBar />
  <div class="right">
    <DeleteButton />
    <div class="group">
      <NewFolderButton />
      <UploadFileButton />
    </div>
    <Views bind:appdata bind:app />
  </div>
</div>
