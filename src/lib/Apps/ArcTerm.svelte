<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/arcterm.css";
  import type { Process } from "../../ts/applogic/interface";
  import { focusedProcessPid } from "../../ts/applogic/store";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcCommands, desktopSpecific } from "../../ts/terminal/store";

  export let process: Process;

  let arcTerm: ArcTerm;
  let target: HTMLDivElement;

  onMount(() => {
    arcTerm = new ArcTerm(
      target,
      [...arcCommands, ...desktopSpecific],
      process,
      (a: ArcTerm) => {
        a.std.clear();
      }
    );
  });

  function focus() {
    if (
      !arcTerm ||
      !arcTerm.input ||
      !arcTerm.input.current ||
      $focusedProcessPid != process.id
    )
      return console.log("no", $focusedProcessPid, process.id, arcTerm);

    arcTerm.input.current.focus();

    if (!target) return;

    target.scrollTo(0, target.scrollHeight);
  }

  setInterval(focus, 1000);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="terminal-renderer" bind:this={target} on:click={focus} />
