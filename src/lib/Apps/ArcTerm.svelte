<script lang="ts">
  import "../../css/desktop/apps/arcterm.css";
  import { onMount } from "svelte";
  import type { App } from "../../ts/applogic/interface";
  import { ArcTerm } from "../../ts/terminal/main";
  import { arcCommands } from "../../ts/terminal/store";

  export let app: App;

  let arcTerm: ArcTerm;
  let target: HTMLDivElement;

  onMount(() => {
    app.events = {};

    app.events.close = () => {
      if (!arcTerm) return;

      arcTerm.dispose();

      arcTerm = null;
    };

    app.events.open = () => {
      if (!arcTerm) {
        arcTerm = new ArcTerm(target, arcCommands, app);
      }
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
    if (!arcTerm || !arcTerm.input.current) return;

    arcTerm.input.current.focus();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="terminal-renderer" bind:this={target} on:click={focus} />
