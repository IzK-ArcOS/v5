<script lang="ts">
  import "@css/desktop/apps/logger.css";
  import type { App } from "$$ts/applogic/interface";
  import { Log, log, LogItem, LogLevel } from "$$ts/console";
  import {
    collectLogsBySource,
    IterableCollectorResult,
  } from "$$ts/console/collector";
  import type { ScopedAppData } from "$$ts/userlogic/interfaces";
  import Content from "./Logger/Content.svelte";
  import Sidebar from "./Logger/Sidebar.svelte";

  let logs: IterableCollectorResult = [];
  let logItems: LogItem[] = [];
  let currentSource = "";

  export let app: App;
  export let appdata: ScopedAppData;

  function setView(source: string) {
    Log({
      source: "apps/Logger: setView",
      msg: `Setting source to "${source}"`,
      level: LogLevel.info,
    });
    for (let i = 0; i < logs.length; i++) {
      if (logs[i][0] == source) logItems = logs[i][1];
    }

    if (!logItems.length) {
      Log({
        source: "apps/Logger: setView",
        msg: `Source "${source}" contains no items or could not be found.`,
        level: LogLevel.info,
      });
    }

    currentSource = source;
  }

  log.subscribe(() => {
    logs = Object.entries(collectLogsBySource());

    app.info.titleSuffix = ` - ${$log.length} items`;
  });
</script>

{#if app}
  <Sidebar {setView} bind:currentSource bind:logs />
  <Content bind:currentSource bind:logItems {setView} {app} bind:appdata />
{/if}
