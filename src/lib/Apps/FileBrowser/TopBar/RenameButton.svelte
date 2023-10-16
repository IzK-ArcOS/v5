<script lang="ts">
  import {
    FileBrowserHome,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function click() {
    showOverlay("renameItem", "FileManager");
  }
</script>

<button
  class="material-icons-round"
  disabled={!$FileBrowserSelectedFilename || $FileBrowserHome}
  title="Rename item"
  on:click={click}
>
  drive_file_rename_outline
</button>
