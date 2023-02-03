<script lang="ts">
  import type { IterableCollectorResult } from "../../../ts/console/collector";
  import Category from "./Category.svelte";

  export let logs: IterableCollectorResult;
  export let setView: (key: string) => void;
  export let currentSource: string;
</script>

<div class="sidebar">
  {#each logs as category}
    <Category bind:setView bind:category bind:currentSource />
  {/each}
</div>
