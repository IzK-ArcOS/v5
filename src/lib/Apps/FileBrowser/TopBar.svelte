<script lang="ts">
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import {
    fbClass,
    FileBrowserCurrentDir,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import AdressBar from "./PathCrumbs.svelte";

  function parentdir() {
    fbClass.goToDirectory(getParentDirectory($FileBrowserCurrentDir));
  }
</script>

<div class="topbar">
  <button
    class="material-icons-round parentdir"
    on:click={parentdir}
    disabled={$FileBrowserCurrentDir == "./"}
  >
    arrow_upward
  </button>
  <AdressBar />
</div>
