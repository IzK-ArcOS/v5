<script lang="ts">
  import {
    AppManagerAppData,
    AppManagerManageOptions,
  } from "../../ts/applogic/apps/AppManager/Manager";
  import "../../css/desktop/apps/AppPoker.css";
  import { OpenApps, updateStores } from "../../ts/applogic/store";
  import type { App } from "../../ts/applogic/interface";

  export let app: App;
  let refresh = false;

  OpenApps.subscribe((v) => {
    if (!v) return;

    refresh = true;

    setTimeout(() => {
      refresh = false;
    }, 1);
  });

  AppManagerAppData.subscribe((v) => {
    app.info.titleSuffix = ` - Managing ${v.info.name}`;

    updateStores();
  });
</script>

{#if $AppManagerAppData && !refresh}
  <div class="manager">
    {#each AppManagerManageOptions as option}
      <button on:click={() => option.action($AppManagerAppData)}>
        {option.caption}: {option.getter($AppManagerAppData)}
      </button>
    {/each}
  </div>
{/if}
