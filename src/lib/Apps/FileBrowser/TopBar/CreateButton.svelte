<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { showOverlay } from "../../../../ts/window/overlay";

  function show() {
    showOverlay("createFile", "FileManager");
  }
</script>

<button
  class="material-icons-round create"
  on:click={show}
  disabled={$fbState.home}
>
  add
</button>
