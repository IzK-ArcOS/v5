<script lang="ts">
  import type { Process } from "../../../../ts/applogic/interface";
  import { showOverlay } from "../../../../ts/window/overlay";

  export let process: Process;

  function trigger() {
    showOverlay("createFolder", process.id);
  }
</script>

<button class="material-icons-round" on:click={trigger} title="New folder"
  >create_new_folder</button
>
