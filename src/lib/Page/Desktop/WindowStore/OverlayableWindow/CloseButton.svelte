<script lang="ts">
  import type { App } from "$$ts/applogic/interface";
  import { hideOverlay } from "$$ts/window/overlay";

  export let app: App;
  export let id: string;

  function closeThis() {
    hideOverlay(id, app.id);
  }
</script>

<button class="overlay-close material-icons-round" on:click={closeThis}>
  close
</button>
