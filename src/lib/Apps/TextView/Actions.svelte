<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";

  import { showOpenFileDialog } from "../../../ts/chooser/main";
  export let app: App;
  export let saveFile: () => void;
</script>

<div class="actions">
  <button
    class="material-icons-round open"
    on:click={() => showOpenFileDialog(app.id)}>folder_open</button
  >
  <button
    class="material-icons-round save"
    on:click={saveFile}
    disabled={!app.openedFile}
  >
    save
  </button>
</div>
