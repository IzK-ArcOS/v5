<script lang="ts">
  import type { App } from "../../../../../ts/applogic/interface";
  import { Log, LogStore } from "../../../../../ts/console";
  import { LogItem, LogLevel } from "../../../../../ts/console/interface";
  import { TrashIcon } from "../../../../../ts/icon/general";
  import {
    ScopedAppData,
    UserData,
  } from "../../../../../ts/userlogic/interfaces";

  export let currentSource: string;
  export let currentFilter: LogLevel;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;
  export let filter: (filter: LogLevel) => void;
  export let appdata: ScopedAppData;
  export let app: App;

  function clearCategory(source: string) {
    for (let i = 0; i < $LogStore.length; i++) {
      if ($LogStore[i].source == source) {
        $LogStore.splice(i, 1);
      }
    }

    currentSource = "";

    logItems = [];

    LogStore.set($LogStore);
  }

  function refresh() {
    Log("Logger: refresh", "Refreshing current view", LogLevel.warn);
    setView(currentSource);

    if (!currentFilter) return;

    filter(currentFilter);
  }

  function changeMonospace() {
    appdata.monospace = !appdata.monospace;

    $UserData.appdata[app.id] = appdata;
  }
</script>

<div class="static">
  <button
    class="action"
    on:click={() => clearCategory(currentSource)}
    disabled={!currentSource}
  >
    <img src={TrashIcon} alt="Clear" />
    Clear
  </button>
  <div class="sep" />
  <button class="action" on:click={refresh} disabled={!currentSource}>
    <span class="material-icons-round">refresh</span>
    Refresh
  </button>
  <button class="action" on:click={changeMonospace}>
    <span class="material-icons-round">title</span>
    monospace
  </button>
</div>
