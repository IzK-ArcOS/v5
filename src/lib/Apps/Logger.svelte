<script lang="ts">
  import "../../css/desktop/apps/logger.css";
  import type { App } from "../../ts/applogic/interface";
  import { log, LogItem, LogLevel } from "../../ts/console";
  import {
    collectLogsBySource,
    IterableCollectorResult,
  } from "../../ts/console/collector";
  import Category from "./Logger/Category.svelte";
  import LogItemSvelte from "./Logger/LogItem.svelte";

  let logs: IterableCollectorResult = [];
  let logItems: LogItem[] = [];
  let currentSource = "";

  export let app: App;

  function setView(source: string) {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i][0] == source) logItems = logs[i][1];
    }

    currentSource = source;
  }

  log.subscribe(() => {
    logs = Object.entries(collectLogsBySource());

    app.info.titleSuffix = ` - ${$log.length} items`;
  });
</script>

<div class="sidebar">
  {#each logs as category}
    <Category {setView} {category} {currentSource} />
  {/each}
</div>

<div class="content">
  {#each logItems as logItem}
    <LogItemSvelte {logItem} />
  {/each}
</div>
