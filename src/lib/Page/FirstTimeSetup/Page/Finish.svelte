<script lang="ts">
  import { projName } from "../../../../ts/env/main";
  import { applyState } from "../../../../ts/state/main";
  import finish from "@assets/fts/finish.svg";
  import Nav from "../Nav.svelte";

  function restart() {
    applyState("boot");
  }
</script>

<div class="header centered">
  <img src={finish} alt="Mode" />
  <h1>Thank you!</h1>
  <p class="subtitle">We greatly appreciate it.</p>
</div>
<p class="fullwidth centered justified">
  Thank you for checking out ArcOS! We hope you'll enjoy it as much as we love
  making it. Please restart ArcOS to use your ArcOS instance.
</p>
<br />
<button class="fullwidth option centered" on:click={restart}>Restart</button>
