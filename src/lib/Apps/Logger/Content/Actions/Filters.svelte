<script lang="ts">
  import { log, LogLevel } from "../../../../../ts/console";

  export let filter: (filter: LogLevel) => void;
  export let currentFilter: LogLevel;
  export let currentSource: string;

  const filters: [LogLevel, string][] = [
    [LogLevel.error, "error"],
    [LogLevel.warn, "warning"],
    [LogLevel.info, "info"],
    [LogLevel.critical, "cancel"],
  ];

  log.subscribe(() => {
    currentFilter = null;
  });
</script>

<div class="filters">
  {#each filters as data}
    <button
      class="filter {LogLevel[data[0]]}"
      on:click={() => filter(data[0])}
      disabled={!currentSource}
      class:selected={data[0] == currentFilter}
    >
      <span class="material-icons">{data[1]}</span>
    </button>
  {/each}
</div>
