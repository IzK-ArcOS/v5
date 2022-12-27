<script lang="ts">
  import { AppInfoData } from "../../../../../ts/applogic/apps/AppInfo";
  import { openWindow } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function manage() {
    AppInfoData.set(app);
    openWindow("AppInfo");
  }
</script>

<button class="appbutton" class:disabled={app.disabled} on:click={manage}>
  <img src={app.info.icon} alt={app.info.name} class="icon" />
  <div class="info">
    <p class="title">
      {app.info.name}
      {app.disabled ? "(disabled)" : ""}
    </p>
    <p class="description">{app.info.description}</p>
  </div>
</button>
