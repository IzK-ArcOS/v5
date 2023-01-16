<script lang="ts">
  import type { LogItem } from "../../../../ts/console";
  import LogItemSvelte from "../LogItem.svelte";

  export let logItems: LogItem[];
</script>

<div class="items">
  {#each logItems as logItem}
    <LogItemSvelte {logItem} />
  {/each}

  {#if !logItems.length}
    <p>No log entries found.</p>
  {/if}
</div>
