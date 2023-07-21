<script lang="ts">
  import { onMount } from "svelte";
  import type { LightsOffGrid } from "../../ts/applogic/apps/LightsOff/interface";
  import type { LightsOffRuntime } from "../../ts/applogic/apps/LightsOff/runtime";
  import type { App } from "../../ts/applogic/interface";
  import Stats from "./LightsOff/Stats.svelte";
  import Light from "./LightsOff/Light.svelte";

  export let app: App;
  export let runtime: LightsOffRuntime;

  let grid: LightsOffGrid = [];

  onMount(() => {
    runtime.Grid.subscribe((v) => (grid = v));
  });
</script>

<Stats {app} {runtime} />
<div class="grid">
  {#each grid as row, y}
    {#each row as light, x}
      <Light {light} {x} {y} {runtime} />
    {/each}
  {/each}
</div>

<style scoped>
  div.grid {
    display: grid;
    grid-template-columns: repeat(5, 80px);
    grid-template-rows: repeat(5, 80px);
    grid-gap: 5px;
  }
</style>
