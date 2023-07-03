<script lang="ts">
  import type { Process } from "../../../../ts/applogic/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let process: Process;

  function show() {
    showOverlay("createFile", process.id);
  }
</script>

<button class="material-icons-round create" on:click={show}> add </button>
