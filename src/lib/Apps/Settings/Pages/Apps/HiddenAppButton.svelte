<script lang="ts">
  import { AppInfoId } from "../../../../../ts/applogic/apps/AppInfo";
  import { openWindow } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";
  import { ArcOSVersion } from "../../../../../ts/env/main";

  export let app: App;

  function manage() {
    AppInfoId.set(app.id);
    openWindow("AppInfo");
  }
</script>

<button class="appbutton" class:disabled={app.disabled} on:click={manage}>
  <img src={app.info.icon} alt={app.info.name} class="icon" />
  <div class="info">
    <p class="title">
      {#if app.parentId}
        ArcOS.{app.parentId}.{app.id}
      {:else}
        ArcOS.{app.id}
      {/if}
    </p>
    <p class="description">{app.info.name}</p>
  </div>
</button>
