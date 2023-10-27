<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function click() {
    showOverlay("renameItem", "FileManager");
  }
</script>

<button
  class="material-icons-round"
  disabled={!$fbState.selectedFilename || $fbState.home}
  title="Rename item"
  on:click={click}
>
  drive_file_rename_outline
</button>
