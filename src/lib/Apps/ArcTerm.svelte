<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/arcterm.css";
  import { fullscreenToggle } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcCommands, desktopSpecific } from "../../ts/terminal/store";
  import { focusedWindowId } from "../../ts/applogic/store";

  export let app: App;

  let arcTerm: ArcTerm;
  let target: HTMLDivElement;

  onMount(() => {
    app.events.close = () => {
      if (!arcTerm) return;

      arcTerm.dispose();

      arcTerm = null;
    };

    app.events.open = () => {
      if (!arcTerm) {
        arcTerm = new ArcTerm(
          target,
          [...arcCommands, ...desktopSpecific],
          app,
          (a: ArcTerm) => {
            a.std.clear();
          }
        );
      }

      if (app.state.windowState.fll) fullscreenToggle(app.id);
    };

    app.events.blur = () => {
      if (arcTerm && arcTerm.input && arcTerm.input.current)
        arcTerm.input.current.disabled = true;
    };

    app.events.focus = () => {
      if (arcTerm && arcTerm.input && arcTerm.input.current)
        arcTerm.input.current.disabled = false;
    };
  });

  function focus() {
    if (
      !arcTerm ||
      !arcTerm.input ||
      !arcTerm.input.current ||
      $focusedWindowId != "ArcTerm"
    )
      return;

    arcTerm.input.current.focus();

    if (!target) return;

    target.scrollTo(0, target.scrollHeight);
  }

  setInterval(focus, 10);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="terminal-renderer" bind:this={target} on:click={focus} />
