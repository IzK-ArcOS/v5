<script lang="ts">
  import { appManSelected } from "../../../../ts/applogic/apps/AppManager/store";
  import { disableApp } from "../../../../ts/applogic/enabling";

  function disable() {
    disableApp($appManSelected);
  }
</script>

<button
  class="action"
  disabled={!$appManSelected || $appManSelected.startsWith("error_")}
  on:click={disable}
>
  <span class="material-icons-round">block</span>
  <p class="caption">Disable</p>
</button>
