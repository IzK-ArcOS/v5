<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/fts/page/license.css";
  import { ARCOS_MODE } from "../../../../ts/branding";
  import { Log } from "../../../../ts/console";
  import { LogLevel } from "../../../../ts/console/interface";
  import { ArcOSVersion } from "../../../../ts/env/main";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { SecureIcon } from "../../../../ts/icon/main";

  let license = "";

  onMount(async () => {
    try {
      const req = await (await fetch("./LICENSE")).text();

      license = req;
    } catch {
      Log(
        "FTS: License.svelte",
        "Could not get the LICENSE file.",
        LogLevel.warn
      );

      license = "Could not GET ./LICENSE";
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
  <img src={SecureIcon} alt="License" class="license" />
</div>
<textarea class="license" bind:value={license} readonly />
<div class="bottom">
  <div class="version">{ArcOSVersion}-{ARCOS_MODE}</div>
  <div class="actions">
    <button class="decline" on:click={decline}>Decline</button>
    <button class="accept" on:click={accept}>Accept</button>
  </div>
</div>
