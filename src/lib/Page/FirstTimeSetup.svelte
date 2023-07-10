<script lang="ts">
  import "../../css/fts.css";
  import { onMount } from "svelte";
  import Right from "./FirstTimeSetup/Right.svelte";
  import { applyFTSState, CurrentFTSState } from "../../ts/fts/main";
  import { FTSStates } from "../../ts/fts/store";
  import sleep from "../../ts/sleep";
  import { ArcSoundBus } from "../../ts/sound/main";

  let show = false;

  onMount(async () => {
    await sleep(500);
    show = true;
    ArcSoundBus.playSound("arcos.system.logon");
    await sleep(500);
    applyFTSState("welcome");
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
