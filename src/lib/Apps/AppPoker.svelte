<script lang="ts">
  import "../../css/desktop/apps/AppPoker.css";
  import {
    AppManagerAppData,
    AppManagerManageBools,
  } from "../../ts/applogic/apps/AppManager/Manager";
  import type { App } from "../../ts/applogic/interface";
  import { updateStores, WindowStore } from "../../ts/applogic/store";
  import Notice from "../Page/Desktop/WindowStore/Window/Notice.svelte";

  export let app: App;
  let refresh = false;

  WindowStore.subscribe((v) => {
    if (!v) return;

    refresh = true;

    setTimeout(() => {
      refresh = false;
    });
  });

  AppManagerAppData.subscribe((v) => {
    if (!v) return;
    app.info.titleSuffix = ` - Managing ${v.info.name}`;

    updateStores();
  });
</script>

{#if $AppManagerAppData && !refresh}
  <Notice
    icon="warning"
    text="You can alter properties for applications that are disabled by default. This can cause the UI to break, be careful!"
    title="Hold up!"
  />
  <div class="manager">
    {#each AppManagerManageBools as option}
      <button
        on:click={() => option.action($AppManagerAppData)}
        class:off={!option.getter($AppManagerAppData)}
      >
        {option.caption}
      </button>
    {/each}
  </div>
{/if}
