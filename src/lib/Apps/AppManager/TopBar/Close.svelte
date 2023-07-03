<script lang="ts">
  import { appManSelectedPid } from "../../../../ts/applogic/apps/AppManager/store";
  import { closeWindow } from "../../../../ts/applogic/events";

  function terminate() {
    console.log($appManSelectedPid);
    /* closeWindow($appManSelected); */

    $appManSelectedPid = null;
  }
</script>

<button class="action" disabled={!$appManSelectedPid} on:click={terminate}>
  <span class="material-icons-round">close</span>
  <p class="caption">Close</p>
</button>
