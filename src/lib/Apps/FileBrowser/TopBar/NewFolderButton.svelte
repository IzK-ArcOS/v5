<script lang="ts">
  import { showOverlay } from "../../../../ts/window/overlay";

  function trigger() {
    showOverlay("createFolder", "FileManager");
  }
</script>

<button class="material-icons-round" on:click={trigger}
  >create_new_folder</button
>
