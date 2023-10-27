<script lang="ts">
  import { appManSelected } from "../../../../ts/applogic/apps/AppManager/store";
  import { closeWindow } from "../../../../ts/applogic/events";

  function terminate() {
    closeWindow($appManSelected);

    $appManSelected = null;
  }
</script>

<button
  class="action"
  disabled={!$appManSelected || $appManSelected.startsWith("error_")}
  on:click={terminate}
>
  <span class="material-icons-round">close</span>
  <p class="caption">Close</p>
</button>
