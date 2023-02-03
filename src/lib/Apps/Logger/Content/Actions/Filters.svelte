<script lang="ts">
  import { log, LogLevel } from "$$ts/console";
  import Filter from "./Filters/Filter.svelte";

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
    <Filter {data} {currentSource} {currentFilter} {filter} />
  {/each}
</div>
