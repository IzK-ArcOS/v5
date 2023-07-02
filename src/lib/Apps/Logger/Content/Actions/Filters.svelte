<script lang="ts">
  import { LogStore } from "../../../../../ts/console";
  import { LogLevel } from "../../../../../ts/console/interface";
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

  LogStore.subscribe(() => {
    currentFilter = null;
  });
</script>

<div class="filters">
  {#each filters as data}
    <Filter {data} {currentSource} {currentFilter} {filter} />
  {/each}
</div>
