<script lang="ts">
  import type { PartiallyExtendedMessage } from "../../../../../ts/messaging/interface";
  import Item from "./Branch/Item.svelte";

  export let items: PartiallyExtendedMessage[] = [];
</script>

<div class="branch">
  {#if items}
    {#each items as item}
      <Item {item} />
    {/each}
  {/if}
</div>
