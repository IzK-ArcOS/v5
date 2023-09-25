<script lang="ts">
  import { FlagIcon } from "../../../../ts/icon/general";
  import sleep from "../../../../ts/sleep";
  import { ArcSoundBus } from "../../../../ts/sound/main";

  async function restart() {
    ArcSoundBus.playSound("arcos.system.logoff");
    await sleep(1000);
    location.reload();
  }
</script>

<div class="header centered">
  <img src={FlagIcon} alt="Mode" />
  <h1>Thank you!</h1>
  <p class="subtitle">We greatly appreciate it.</p>
</div>
<p class="fullwidth centered justified">
  Thank you for checking out ArcOS! We hope you'll enjoy it as much as we love
  making it. Please restart ArcOS to use your ArcOS instance.
</p>
<br />
<button class="fullwidth option centered" on:click={restart}>Restart</button>
