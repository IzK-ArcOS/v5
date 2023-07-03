<script lang="ts">
  import { AppInfoId } from "../../../../ts/applogic/apps/AppInfo";
  import { appManSelectedPid } from "../../../../ts/applogic/apps/AppManager/store";
  import { createProcess } from "../../../../ts/applogic/events";
  import { getWindow } from "../../../../ts/applogic/store";

  function info() {
    AppInfoId.set(getWindow($appManSelectedPid).id);

    createProcess("AppInfo");
  }
</script>

<button class="action" disabled={!$appManSelectedPid} on:click={info}>
  <span class="material-icons-round">settings</span>
  <p class="caption">App info</p>
</button>
