<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/arctermonly.css";
  import "../../css/terminal/main.css";
  import { rememberedLogin } from "../../ts/api/getter";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcTermModeIntro } from "../../ts/terminal/mode";
  import { arcCommands } from "../../ts/terminal/store";

  let arcterm: ArcTerm;
  let target: HTMLDivElement;

  onMount(async () => {
    await rememberedLogin();

    setTimeout(async () => {
      arcterm = new ArcTerm(target, arcCommands, null, arcTermModeIntro);
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
