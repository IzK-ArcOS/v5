<script lang="ts">
  import mode from "../../../../assets/fts/mode.svg";
  import { applyFTSState } from "../../../../ts/fts/main";
  import L from "../../../Language/L.svelte";
</script>

<div class="header centered">
  <img src={mode} alt="Login" />
  <h1><L id="fts.authmode.header" /></h1>
  <p class="subtitle"><L id="fts.authmode.subtitle" /></p>
</div>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("auth-existing")}
>
  <L id="fts.authmode.existing" />
</button>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("auth-new")}
>
  <L id="fts.authmode.new" />
</button>
