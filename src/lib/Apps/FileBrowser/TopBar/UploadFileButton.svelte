<script lang="ts">
  import { showOverlay } from "../../../../ts/window/overlay";

  function showUploader() {
    showOverlay("uploadFileDialog", "FileManager");
  }
</script>

<button class="material-icons-round" on:click={showUploader}>upload</button>
