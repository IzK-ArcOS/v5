<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";

  import { OpenApps } from "../../../ts/applogic/store";
  import Window from "./WindowStore/Window.svelte";

  let oa: App[] = [];

  OpenApps.subscribe((v) => {
    oa = [];

    if (v) oa = v;
  });
</script>

<div class="winstore">
  {#each oa as app}
    {#if app}
      <Window {app} />
    {/if}
  {/each}
</div>
