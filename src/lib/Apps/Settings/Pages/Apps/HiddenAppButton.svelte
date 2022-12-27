<script lang="ts">
  import { AppInfoId } from "../../../../../ts/applogic/apps/AppInfo";
  import { openWindow } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function manage() {
    AppInfoId.set(app.id);
    openWindow("AppInfo");
  }
</script>

<button class="appbutton" class:disabled={app.disabled} on:click={manage}>
  <img src={app.info.icon} alt={app.info.name} class="icon" />
  <div class="info">
    <p class="title">ArcOS.{app.id}</p>
    <p class="description">{app.info.name}</p>
  </div>
</button>
