<script lang="ts">
  import "../../../../css/fts/page/welcome.css";
  import { Logo } from "../../../../ts/branding";
  import { applyFTSState } from "../../../../ts/fts/main";
  import L from "../../../Language/L.svelte";
</script>

<div class="center-flex">
  <div>
    <img src={Logo()} alt="ArcOS" class="logo" />
    <h1 class="center-header"><L id="fts.welcome.header" /></h1>
    <p class="center"><L id="fts.welcome.caption" /></p>
    <button on:click={() => applyFTSState("license")}>
      <L id="fts.welcome.continue" />
    </button>
  </div>
</div>
