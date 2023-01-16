<script lang="ts">
  import "../../css/desktop/apps/logger.css";
  import type { App } from "../../ts/applogic/interface";
  import { Log, log, LogItem, LogLevel } from "../../ts/console";
  import {
    collectLogsBySource,
    IterableCollectorResult,
  } from "../../ts/console/collector";
  import Category from "./Logger/Category.svelte";
  import LogItemSvelte from "./Logger/LogItem.svelte";
  import clear from "../../assets/apps/logger/clear.svg";

  let logs: IterableCollectorResult = [];
  let logItems: LogItem[] = [];
  let currentSource = "";
  let content: HTMLDivElement;

  export let app: App;

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

  function clearCategory(source: string) {
    for (let i = 0; i < $log.length; i++) {
      if ($log[i].source == source) {
        $log.splice(i, 1);
      }
    }

    currentSource = "";

    logItems = [];

    log.set($log);
  }

  function refresh() {
    setView(currentSource);
  }
</script>

<div class="sidebar">
  {#each logs as category}
    <Category {setView} {category} {currentSource} />
  {/each}
</div>

<div class="content" bind:this={content}>
  <div class="actions">
    <button
      class="action"
      on:click={() => clearCategory(currentSource)}
      disabled={!currentSource}
    >
      <img src={clear} alt="Clear" />
      Clear
    </button>
    <button class="action" on:click={refresh} disabled={!currentSource}>
      <span class="material-icons">refresh</span>
      Refresh
    </button>
  </div>
  <div class="items">
    {#each logItems as logItem}
      <LogItemSvelte {logItem} />
    {/each}
  </div>
</div>
