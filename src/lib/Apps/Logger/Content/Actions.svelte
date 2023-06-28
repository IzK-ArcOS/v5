<script lang="ts">
  import type { App } from "../../../../ts/applogic/interface";
  import { log, LogItem, LogLevel } from "../../../../ts/console";
  import type { ScopedAppData } from "../../../../ts/userlogic/interfaces";
  import Filters from "./Actions/Filters.svelte";
  import Static from "./Actions/Static.svelte";

  export let app: App;
  export let currentSource: string;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;
  export let updating: boolean;
  export let appdata: ScopedAppData;

  let original: LogItem[] = [];
  let currentFilter: LogLevel;

  log.subscribe((v) => {
    updating = true;

    original = [];
    currentFilter = null;

    const logs = Object.entries(v);

    for (let i = 0; i < logs.length; i++) {
      if (logs[i][0] == currentSource) original.push(logs[i][1]);
    }

    setTimeout(() => {
      updating = false;
    });
  });

  function filter(level: LogLevel) {
    if (currentFilter == level) {
      const source = `${currentSource}`;
      setView(null);
      setTimeout(() => {
        setView(source);
      });

      return;
    }

    if (!original.length) original = logItems;

    const items = [];

    for (let i = 0; i < original.length; i++) {
      if (level == original[i].level) items.push(original[i]);
    }

    logItems = items;

    currentFilter = level;
  }
</script>

<div class="actions">
  <Static
    {currentFilter}
    bind:currentSource
    {filter}
    bind:logItems
    {setView}
    bind:appdata
    {app}
  />
  <Filters {currentFilter} {currentSource} {filter} />
</div>
