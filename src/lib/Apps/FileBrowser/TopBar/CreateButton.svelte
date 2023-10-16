<script lang="ts">
  import { FileBrowserHome } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function show() {
    showOverlay("createFile", "FileManager");
  }
</script>

<button
  class="material-icons-round create"
  on:click={show}
  disabled={$FileBrowserHome}
>
  add
</button>
