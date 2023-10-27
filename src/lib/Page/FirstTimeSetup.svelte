<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/fts.css";
  import { applyFTSState } from "../../ts/fts/main";
  import sleep from "../../ts/sleep";
  import { ArcSoundBus } from "../../ts/sound/main";
  import Left from "./FirstTimeSetup/Left.svelte";
  import Right from "./FirstTimeSetup/Right.svelte";

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
  <div class="fts-content">
    <Left />
    <Right />
  </div>
</div>
