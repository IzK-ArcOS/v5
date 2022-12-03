<script lang="ts">
  import { WindowStore, WS } from "../../../ts/applogic/store";
  import Window from "./WindowStore/Window.svelte";

  let oa: WS = {};
  let oaKeys: string[];

  WindowStore.subscribe((v) => {
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
