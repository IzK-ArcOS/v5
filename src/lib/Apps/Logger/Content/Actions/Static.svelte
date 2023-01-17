<script lang="ts">
  import clear from "../../../../../assets/apps/logger/clear.svg";
  import { Log, log, LogItem, LogLevel } from "../../../../../ts/console";

  export let currentSource: string;
  export let currentFilter: LogLevel;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;
  export let filter: (filter: LogLevel) => void;

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
    Log({
      source: "Logger: refresh",
      msg: "Refreshing current view",
      level: LogLevel.warn,
    });
    setView(currentSource);

    if (!currentFilter) return;

    filter(currentFilter);
  }
</script>

<div class="static">
  <button
    class="action"
    on:click={() => clearCategory(currentSource)}
    disabled={!currentSource}
  >
    <img src={clear} alt="Clear" />
    Clear
  </button>
  <div class="sep" />
  <button class="action" on:click={refresh} disabled={!currentSource}>
    <span class="material-icons">refresh</span>
    Refresh
  </button>
</div>
