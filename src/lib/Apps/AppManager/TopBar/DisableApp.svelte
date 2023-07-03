<script lang="ts">
  import { appManSelectedPid } from "../../../../ts/applogic/apps/AppManager/store";
  import { disableApp } from "../../../../ts/applogic/enabling";
  import { getWindow } from "../../../../ts/applogic/store";

  function disable() {
    disableApp(getWindow($appManSelectedPid).id);
  }
</script>

<button class="action" disabled={!$appManSelectedPid} on:click={disable}>
  <span class="material-icons-round">block</span>
  <p class="caption">Disable</p>
</button>
