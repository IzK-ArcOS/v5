<script lang="ts">
  import { onMount } from "svelte";
  import Page from "../../Page/Desktop/WindowStore/Window/Page.svelte";
  import Background from "./Main/Background.svelte";
  import OnScreenDisplay from "./Main/OnScreenDisplay.svelte";
  import Game from "./Main/Game.svelte";
  import type { QlorbRuntime } from "../../../ts/applogic/apps/Qlorb/runtime";
  export let runtime: QlorbRuntime;

  let level = 0;

  onMount(() => {
    runtime.flushStores();
    runtime.Score.subscribe((v) => (level = Math.floor(v / 100)));
  });
</script>

<Page bind:store={runtime.CurrentPage} name="game">
  <div class="game level-{level}">
    <Background />
    <OnScreenDisplay {runtime} />
    <Game {runtime} />
  </div>
</Page>
