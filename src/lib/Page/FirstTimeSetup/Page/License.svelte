<script lang="ts">
  import license from "@assets/fts/license.svg";
  import { applyFTSState } from "../../../../ts/fts/main";

  function openIt() {
    window.open(
      "https://www.gnu.org/licenses/gpl-3.0-standalone.html",
      "_blank"
    );
  }
</script>

<div class="header centered">
  <img src={license} alt="Mode" />
  <h1>License agreement</h1>
  <p class="subtitle">By using ArcOS, you agree to the GPLv3 License.</p>
</div>
<button class="fullwidth option centered" on:click={openIt}>Open license</button
>
<button
  class="fullwidth option centered"
  on:click={() => applyFTSState("servconn")}>I Agree</button
>
