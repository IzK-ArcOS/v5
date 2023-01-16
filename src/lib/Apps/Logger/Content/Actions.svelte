<script lang="ts">
  import { log, LogItem, LogLevel } from "../../../../ts/console";
  import clear from "../../../../assets/apps/logger/clear.svg";

  export let currentSource: string;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;

  let original: LogItem[] = [];
  let currentFilter: LogLevel;

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

    if (!currentFilter) return;

    filter(currentFilter);
  }

  log.subscribe((v) => {
    if (!currentFilter || !v) return;

    original = [];

    const logs = Object.entries(v);

    for (let i = 0; i < logs.length; i++) {
      if (logs[i][0] == currentSource) original.push(logs[i][1]);
    }

    setTimeout(() => {
      filter(currentFilter);
    });
  });

  function filter(level: LogLevel) {
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
  <div class="sep" />
  <div class="filters">
    <button
      class="filter"
      on:click={() => filter(LogLevel.error)}
      disabled={!currentSource}
      class:selected={LogLevel.error == currentFilter}
    >
      <span class="material-icons">error</span>
    </button>

    <button
      class="filter"
      on:click={() => filter(LogLevel.warn)}
      disabled={!currentSource}
      class:selected={LogLevel.warn == currentFilter}
    >
      <span class="material-icons">warning</span>
    </button>

    <button
      class="filter"
      on:click={() => filter(LogLevel.info)}
      disabled={!currentSource}
      class:selected={LogLevel.info == currentFilter}
    >
      <span class="material-icons">info</span>
    </button>
    <button
      class="filter"
      on:click={() => filter(LogLevel.critical)}
      disabled={!currentSource}
      class:selected={LogLevel.critical == currentFilter}
    >
      <span class="material-icons">cancel</span>
    </button>
  </div>
</div>
