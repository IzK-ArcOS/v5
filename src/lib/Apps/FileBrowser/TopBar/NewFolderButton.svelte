<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function trigger() {
    showOverlay("createFolder", "FileManager");
  }
</script>

<button
  class="material-icons-round"
  on:click={trigger}
  title="New folder"
  disabled={$fbState.home}
>
  create_new_folder
</button>
