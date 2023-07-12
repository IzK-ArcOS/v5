<script lang="ts">
  import license from "../../../../assets/fts/license.svg";
  import { applyFTSState } from "../../../../ts/fts/main";
  import L from "../../../Language/L.svelte";

  function openIt() {
    window.open(
      "https://www.gnu.org/licenses/gpl-3.0-standalone.html",
      "_blank"
    );
  }
</script>

<div class="header centered">
  <img src={license} alt="Mode" />
  <h1>
    <L id="fts.license.header" />
  </h1>
  <p class="subtitle">
    <L id="fts.license.subtitle" />
  </p>
</div>
<button class="fullwidth option centered" on:click={openIt}>
  <L id="fts.license.open" />
</button>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("connecttocloud")}
>
  <L id="fts.license.agree" />
</button>
