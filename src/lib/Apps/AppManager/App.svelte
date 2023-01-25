<script lang="ts">
  import { getOriginalIcon } from "../../../ts/applogic/icon";
  import type { App } from "../../../ts/applogic/interface";

  export let app: App;
  export let error = false;
</script>

{#if app}
  <div class="appinstance">
    <div>
      <img src={getOriginalIcon(app.id) || app.info.icon} alt="" />
    </div>
    <div class="appname">
      {app.info.name}
      {#if error}
        (Dialog)
      {/if}
    </div>
    <div class="id">
      {#if app.parentId}
        ArcOS.{app.parentId}.{app.id}
      {:else}
        ArcOS.{app.id}
      {/if}
    </div>
  </div>
{/if}
