<script lang="ts">
  import { FileBrowserHome } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function trigger() {
    showOverlay("createFolder", "FileManager");
  }
</script>

<button
  class="material-icons-round"
  on:click={trigger}
  title="New folder"
  disabled={$FileBrowserHome}
>
  create_new_folder
</button>
