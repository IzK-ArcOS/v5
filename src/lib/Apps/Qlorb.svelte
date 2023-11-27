<script lang="ts">
  import { onMount } from "svelte";
  import type { QlorbRuntime } from "../../ts/applogic/apps/Qlorb/runtime";
  import Background from "./Qlorb/Background.svelte";
  import OnScreenDisplay from "./Qlorb/OnScreenDisplay.svelte";
  import Game from "./Qlorb/Game.svelte";
  import "../../css/desktop/apps/qlorb.css";
  export let runtime: QlorbRuntime;

  let level = 0;

  onMount(() => {
    runtime.Score.subscribe((v) => (level = Math.floor(v / 100)));
  });
</script>

{#if runtime}
  <div class="game level-{level}">
    <Background />
    <OnScreenDisplay {runtime} />
    <Game {runtime} />
  </div>
{/if}
