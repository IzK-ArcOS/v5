<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/fts.css";
  import { applyFTSState, CurrentFTSState } from "../../ts/fts/main";
  import { FTSStates } from "../../ts/fts/store";
  import Right from "./FirstTimeSetup/Right.svelte";

  let show = false;

  onMount(() => {
    setTimeout(() => (show = true), 500);
    setTimeout(() => applyFTSState("welcome"), 1000);
  });
</script>

<div class="fts fullscreen" class:show>
  <div class="center-absolute">
    <div class="left">
      {#each [...FTSStates] as [key, value]}
        <div
          class="state"
          class:activated={$CurrentFTSState && $CurrentFTSState.key == key}
        >
          <img src={value.image} alt={value.name} />
          {value.name}
        </div>
      {/each}
    </div>
    <Right />
  </div>
</div>
