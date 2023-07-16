<script lang="ts">
  import "../../css/desktop/apps/logger.css";
  import type { App } from "../../ts/applogic/interface";
  import { Log, LogStore } from "../../ts/console";
  import {
    collectLogsBySource,
    IterableCollectorResult,
  } from "../../ts/console/collector";
  import { LogLevel, type LogItem } from "../../ts/console/interface";
  import type { ScopedAppData } from "../../ts/userlogic/interfaces";
  import Content from "./Logger/Content.svelte";
  import Sidebar from "./Logger/Sidebar.svelte";

  let logs: IterableCollectorResult = [];
  let logItems: LogItem[] = [];
  let currentSource = "";

  export let app: App;
  export let appdata: ScopedAppData;

  function setView(source: string) {
    Log("apps/Logger: setView", `Setting source to "${source}"`);
    for (let i = 0; i < logs.length; i++) {
      if (logs[i][0] == source) logItems = logs[i][1];
    }

    if (!logItems.length) {
      Log(
        "apps/Logger: setView",
        `Source "${source}" contains no items or could not be found.`,
        LogLevel.info
      );
    }

    currentSource = source;
  }

  LogStore.subscribe(() => {
    logs = Object.entries(collectLogsBySource());

    app.info.titleSuffix = ` - ${$LogStore.length} items`;
  });
</script>

{#if app}
  <Sidebar {setView} bind:currentSource bind:logs />
  <Content bind:currentSource bind:logItems {setView} {app} bind:appdata />
{/if}
