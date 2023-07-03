<script lang="ts">
  import type { Process } from "../../../../../ts/applogic/interface";
  import { hideOverlay } from "../../../../../ts/window/overlay";

  export let id: string;
  export let parent: Process;

  function closeThis() {
    hideOverlay(id, parent.id);
  }
</script>

<button class="overlay-close material-icons-round" on:click={closeThis}>
  close
</button>
