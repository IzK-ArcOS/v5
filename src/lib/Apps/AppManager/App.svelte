<script lang="ts">
  import { get } from "svelte/store";
  import { appManSelected } from "../../../ts/applogic/apps/AppManager/store";
  import { isDisabled, isOpened } from "../../../ts/applogic/checks";
  import { openWindow } from "../../../ts/applogic/events";
  import { getAppIcon, getOriginalIcon } from "../../../ts/applogic/icon";
  import type { App } from "../../../ts/applogic/interface";

  export let app: App;
  export let error = false;

  function select() {
    $appManSelected = app.id;
  }
</script>

{#if app && !isDisabled(app.id) && isOpened(app.id)}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="appinstance"
    class:closed={!app.opened}
    on:click={select}
    class:selected={$appManSelected == app.id}
  >
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
  </div>
{/if}
