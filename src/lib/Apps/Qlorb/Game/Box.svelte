<script lang="ts">
  import { onMount } from "svelte";
  import type { QlorbRuntime } from "../../../../ts/applogic/apps/Qlorb/runtime";

  export let runtime: QlorbRuntime;
  export let box: Box;

  let button: HTMLButtonElement;
  let disabled = false;
  let offset = -65;
  let rightclicked = false;

  onMount(() => {
    setTimeout(() => (offset = box.yoffset), 100);
  });

  runtime.Clicks.subscribe(
    (v) => v == 0 && setTimeout(() => (disabled = false))
  );

  function score() {
    runtime.ScorePoints(box, button);
    disabled = true;
  }

  function negativeScore(e: Event) {
    e.preventDefault();

    runtime.ScoreNegativePoints(box, button);

    rightclicked = true;
    disabled = true;
  }
</script>

<button
  class="box {box.class}"
  style="--offset: {offset}px;"
  class:triggered={disabled}
  on:click={score}
  on:contextmenu={negativeScore}
  {disabled}
  bind:this={button}
>
  <span
    class="modifier-floaty"
    class:positive={(rightclicked ? -box.modifier : box.modifier) >= 0}
    class:negative={(rightclicked ? -box.modifier : box.modifier) < 0}
  >
    {rightclicked ? -box.modifier : box.modifier}
  </span>
</button>
