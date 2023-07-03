<script lang="ts">
  import { FileBrowserSelectedFilename } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { Process } from "../../../../ts/applogic/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let process: Process;

  function click() {
    showOverlay("renameItem", process.id);
  }
</script>

<button
  class="material-icons-round"
  disabled={!$FileBrowserSelectedFilename}
  title="Rename item"
  on:click={click}
>
  drive_file_rename_outline
</button>
