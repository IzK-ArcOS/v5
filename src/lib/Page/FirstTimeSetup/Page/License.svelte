<script lang="ts">
  import "../../../../css/fts/page/license.css";
  import { onMount } from "svelte";
  import icon from "../../../../assets/fts/license.svg";
  import { ARCOS_MODE } from "../../../../ts/branding";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import { applyFTSState } from "../../../../ts/fts/main";

  let license = "";

  onMount(async () => {
    try {
      const req = await (await fetch("./LICENSE")).text();

      license = req;
    } catch {
      console.error("LICENSE IS MISSING!!!");
    }
  });

  function decline() {
    applyFTSState("welcome");
  }

  function accept() {
    applyFTSState("connecttocloud");
  }
</script>

<div class="header">
  <div class="text">
    <h1>License Agreement</h1>
    <p>By using ArcOS, you agree to the GPLv3 License.</p>
  </div>
  <img src={icon} alt="License" class="license" />
</div>
<textarea class="license" bind:value={license} />
<div class="bottom">
  <div class="version">{ArcOSVersion}-{ARCOS_MODE}</div>
  <div class="actions">
    <button class="decline" on:click={decline}>Decline</button>
    <button class="accept" on:click={accept}>Accept</button>
  </div>
</div>
