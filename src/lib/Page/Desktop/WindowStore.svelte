<script lang="ts">
  import { OpenApps, WS } from "../../../ts/applogic/store";
  import Window from "./WindowStore/Window.svelte";

  let oa: WS = {};
  let oaKeys: string[];

  OpenApps.subscribe((v) => {
    oa = {};

    if (v) {
      oa = v;
      oaKeys = Object.keys(oa);
    }
  });
</script>

<div class="winstore">
  {#each oaKeys as id}
    <Window {id} />
  {/each}
</div>
