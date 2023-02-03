<script lang="ts">
  import { get } from "svelte/store";
  import { isDisabled } from "$$ts/applogic/checks";
  import { getAppIcon, getOriginalIcon } from "$$ts/applogic/icon";
  import type { App } from "$$ts/applogic/interface";

  export let app: App;
  export let error = false;
</script>

{#if app && !isDisabled(app.id)}
  <div class="appinstance" class:closed={!app.opened}>
    <div>
      <img src={getOriginalIcon(app.id) || getAppIcon(app)} alt="" />
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
      {#if !app.info.builtin}
        (by {app.info.author})
      {/if}
    </div>
  </div>
{/if}
