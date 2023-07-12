<script lang="ts">
  import finish from "../../../../assets/fts/finish.svg";
  import sleep from "../../../../ts/sleep";
  import { ArcSoundBus } from "../../../../ts/sound/main";
  import L from "../../../Language/L.svelte";

  async function restart() {
    ArcSoundBus.playSound("arcos.system.logoff");
    await sleep(1000);
    location.reload();
  }
</script>

<div class="header centered">
  <img src={finish} alt="Mode" />
  <h1><L id="fts.finish.header" /></h1>
  <p class="subtitle"><L id="fts.finish.subtitle" /></p>
</div>
<p class="fullwidth centered justified">
  <L id="fts.finish.context" />
</p>
<br />
<button class="fullwidth option centered" on:click={restart}>
  <L id="restart" />
</button>
