<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/arctermonly.css";
  import "../../css/terminal/main.css";
  import { rememberedLogin } from "../../ts/api/getter";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcCommands } from "../../ts/terminal/store";
  import { UserData } from "../../ts/userlogic/interfaces";

  let arcterm: ArcTerm;
  let target: HTMLDivElement;

  onMount(async () => {
    await rememberedLogin();

    setTimeout(() => {
      if (!$UserData) {
        target.innerText =
          "Authentication failed! Please make sure you check\n'Stay logged in' at the login screen to enable this mode.\n\nRestarting in 5 seconds...";

        return setTimeout(() => location.reload(), 5000);
      }

      arcterm = new ArcTerm(target, arcCommands, null, (a) => {
        a.util.writeColor(
          "[█] You are currently in [ArcTerm mode].\n[█] Commands that require the ArcOS desktop have been disabled.",
          "orange"
        );

        a.util.writeLine("\n");
      });
    }, 100);
  });

  function focus() {
    if (!arcterm || !arcterm.input || !arcterm.input.current) return;

    arcterm.input.current.focus();

    if (!target) return;

    target.scrollTo(0, target.scrollHeight);
  }

  setInterval(focus, 10);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="target" class="terminal-renderer" bind:this={target} on:click={focus}>
  authenticating with ArcAPI...
</div>
