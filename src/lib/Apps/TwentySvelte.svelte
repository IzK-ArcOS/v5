<script lang="ts">
  import "../../css/desktop/apps/2048.css";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import type { GameState } from "../../ts/applogic/apps/TwentyFourtyEight/interface";
  import type { TwentyRuntime } from "../../ts/applogic/apps/TwentyFourtyEight/runtime";
  import type { App } from "../../ts/applogic/interface";
  import { getAppPreference, setAppPreference } from "../../ts/applogic/pref";
  import { focusedWindowId } from "../../ts/applogic/store";
  import { CurrentState } from "../../ts/state/main";
  import Header from "./TwentySvelte/Header.svelte";
  import Tablet from "./TwentySvelte/Tablet.svelte";

  export let runtime: TwentyRuntime;
  export let app: App;

  const dimension = 4;
  const gameState: Writable<GameState> = writable<GameState>();

  const newGame = () => {
    gameState.set(runtime.genInitialState(dimension));
  };

  gameState.subscribe((v) => {
    if (!v || !v.score) return;

    setAppPreference(app.id, "state", {
      score: v.score,
      finished: v.finished,
      tablet: v.tablet,
      dimension: v.dimension,
    });
  });

  onMount(() => {
    newGame();

    const saved = getAppPreference(app.id, "state") as GameState;

    if (typeof saved !== "object") return;

    if (!Object.keys(saved).length) return;

    $gameState.score = saved.score;
    $gameState.dimension = saved.dimension;
    $gameState.tablet = saved.tablet;
    $gameState.finished = saved.finished;
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if ($focusedWindowId !== app.id || CurrentState.key !== "desktop") return;

    if ($gameState.actions[event.key]) {
      $gameState = $gameState.actions[event.key]($gameState);
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $gameState}
  <Header state={$gameState} {newGame} />
  <Tablet tablet={$gameState.tablet} />
{/if}
