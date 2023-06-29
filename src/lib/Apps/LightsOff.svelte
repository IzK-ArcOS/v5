<script lang="ts">
  import { onMount } from "svelte";
  import {
    LO_LEVEL,
    loadLevel,
  } from "../../ts/applogic/apps/LightsOff/grid/levels";
  import {
    LOContainsLights,
    LOGrid,
  } from "../../ts/applogic/apps/LightsOff/grid";
  import { LOClicks } from "../../ts/applogic/apps/LightsOff/game";
  import Light from "./LightsOff/Light.svelte";
  import { UserData, type ScopedAppData } from "../../ts/userlogic/interfaces";
  import type { App } from "../../ts/applogic/interface";
  import type { LightsOffGrid } from "../../ts/applogic/apps/LightsOff/interface";
  import Stats from "./LightsOff/Stats.svelte";

  export let app: App;

  onMount(load);

  function load() {
    if ($UserData.appdata[app.id]) {
      const data = $UserData.appdata[app.id];

      loadLevel(data.level as number);
      $LOGrid = data.grid as LightsOffGrid;
      $LOClicks = data.clicks as number;
    } else loadLevel(0);
  }

  function updateSave() {
    if ($LO_LEVEL == 0 && !LOContainsLights()) return;

    $UserData.appdata[app.id] = {
      clicks: $LOClicks,
      level: $LO_LEVEL,
      grid: $LOGrid,
    };
  }

  LOClicks.subscribe(updateSave);
  LO_LEVEL.subscribe(updateSave);
  LOGrid.subscribe(updateSave);
</script>

<Stats {app} {load} />
<div class="grid">
  {#each $LOGrid as row, y}
    {#each row as light, x}
      <Light {light} {x} {y} />
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
