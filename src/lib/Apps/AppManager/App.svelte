<script lang="ts">
  import { get } from "svelte/store";
  import { isDisabled } from "../../../ts/applogic/checks";
  import { openWindow } from "../../../ts/applogic/events";
  import { getAppIcon, getOriginalIcon } from "../../../ts/applogic/icon";
  import type { App } from "../../../ts/applogic/interface";

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
        {app.parentId}.{app.id}
      {:else}
        {app.id}
      {/if}
    </div>
    <button
      class="open"
      disabled={app.opened}
      on:click={() => openWindow(app.id)}>Open</button
    >
  </div>
{/if}
