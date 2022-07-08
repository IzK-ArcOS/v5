<script lang="ts">
  import "../../css/fts.css";
  import logo from "../../assets/systemIcon.svg";
  import { projName } from "../../ts/env/main";
  import { onMount } from "svelte";
  import Right from "./FirstTimeSetup/Right.svelte";
  import { applyFTSState } from "../../ts/fts/main";

  let show = false;

  onMount(() => {
    setTimeout(() => (show = true), 500);
    setTimeout(() => applyFTSState("welcome"), 1000);
  });
</script>

<div class="fts fullscreen" class:show>
  <div class="center-absolute">
    <div class="left">
      <div class="center-absolute">
        <img src={logo} alt={projName} />
        <h2>{projName} Setup</h2>
      </div>
    </div>
    <Right />
  </div>
</div>
