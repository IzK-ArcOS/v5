<script lang="ts">
  import type { Tablet } from "../../../ts/applogic/apps/TwentyFourtyEight/interface";
  import Tile from "./Tile.svelte";

  export let tablet: Tablet;
</script>

<div class="grid wrapper">
  {#each [...Array(tablet.length ** 2).keys()] as box}
    <div class="box box-{box}" />
  {/each}
  <div class="tiles">
    {#each tablet.flatMap((row) => row) as tile}
      {#if tile.position}
        <Tile {tile} />
      {/if}
    {/each}
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-gap: 9px;
    grid-template-columns: repeat(4, 76px);
    grid-template-rows: repeat(4, 76px);
    grid-auto-flow: row;
    width: fit-content;
  }
  .wrapper {
    position: relative;
  }

  .tiles {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .box {
    background-color: var(--button-glass-bg);
    border-radius: var(--button-border-rad);
  }
</style>
