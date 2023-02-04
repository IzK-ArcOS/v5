<script lang="ts">
  import { showOverlay } from "../../../../ts/window/overlay";

  function show() {
    showOverlay("createFile", "FileManager");
  }
</script>

<button class="material-icons-round create" on:click={show}> add </button>
