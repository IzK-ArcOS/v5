<script lang="ts">
  import { AppInfoId } from "../../../../../ts/applogic/apps/AppInfo";
  import { openWindow } from "../../../../../ts/applogic/events";
  import { getAppIcon, getOriginalIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function manage() {
    AppInfoId.set(app.id);
    openWindow("AppInfo");
  }
</script>

<button class="appbutton" class:disabled={app.disabled} on:click={manage}>
  <img
    src={getOriginalIcon(app.id) || getAppIcon(app)}
    alt={app.info.name}
    class="icon"
  />
  <div class="info">
    <p class="title">
      {app.info.name}
      {app.disabled ? "(disabled)" : ""}
    </p>
    <p class="description">{app.info.description}</p>
  </div>
</button>
