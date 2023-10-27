<script lang="ts">
  import type { GameState } from "../../../ts/applogic/apps/TwentyFourtyEight/interface";

  export let state: GameState;
  export let newGame: () => void;
</script>

<div class="header">
  <button class="reset-game" on:click={newGame}>New Game</button>
  <div class="right">
    Score: {state.score}
  </div>
</div>
