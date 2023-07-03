<script lang="ts">
  import { AppInfoId } from "../../../../../ts/applogic/apps/AppInfo";
  import { createProcess } from "../../../../../ts/applogic/events";
  import { getAppIcon, getOriginalIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function manage() {
    AppInfoId.set(app.id);
    createProcess("AppInfo");
  }
</script>

<button class="appbutton" class:disabled={app.disabled} on:click={manage}>
  <img src={getAppIcon(app)} alt={app.info.name} class="icon" />
  <div class="info">
    <p class="title">
      {app.info.name}
    </p>
    <p class="description">{app.info.description}</p>
  </div>
</button>
