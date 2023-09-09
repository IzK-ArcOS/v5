<script lang="ts">
  import { AppInfoId } from "../../../../ts/applogic/apps/AppInfo";
  import { appManSelected } from "../../../../ts/applogic/apps/AppManager/store";
  import { openWindow } from "../../../../ts/applogic/events";

  function info() {
    AppInfoId.set($appManSelected);

    openWindow("AppInfo");
  }
</script>

<button
  class="action"
  disabled={!$appManSelected || $appManSelected.startsWith("error_")}
  on:click={info}
>
  <span class="material-icons-round">settings</span>
  <p class="caption">App info</p>
</button>
