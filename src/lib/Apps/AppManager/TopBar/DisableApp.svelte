<script>
  import { appManSelected } from "../../../../ts/applogic/apps/AppManager/store";
  import { disableApp } from "../../../../ts/applogic/enabling";
  import { closeWindow } from "../../../../ts/applogic/events";

  function disable() {
    disableApp($appManSelected);
  }
</script>

<button class="action" disabled={!$appManSelected} on:click={disable}>
  <span class="material-icons-round">block</span>
  <p class="caption">Disable</p>
</button>
