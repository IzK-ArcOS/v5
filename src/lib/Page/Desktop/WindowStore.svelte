<script>
  import { OpenApps } from "../../../ts/applogic/store";
  import Window from "./WindowStore/Window.svelte";
</script>

<div class="winstore">
  {#each [...$OpenApps] as app}
    <Window {app} />
  {/each}
</div>
