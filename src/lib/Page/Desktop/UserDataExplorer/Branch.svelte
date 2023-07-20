<script lang="ts">
  import Node from "./Node.svelte";
  import Branch from "./Branch.svelte";
  export let key: string;
  export let value: string | boolean | number | object;

  export let top = false;
</script>

<div class:indent={!top}>
  <Node {key} {value} />
  {#if typeof value == "object" && value}
    {#each Object.entries(value) as child}
      <Branch key={child[0]} value={child[1]} />
    {/each}
  {/if}
</div>
