<script lang="ts">
  import { onMount } from "svelte";

  import BoxComponent from "./Game/Box.svelte";
  import type { QlorbRuntime } from "../../../ts/applogic/apps/Qlorb/runtime";
  import { get } from "svelte/store";
  export let runtime: QlorbRuntime;

  let offset = 0;
  let boxes: Box[];

  runtime.Clicks.subscribe((v) => {
    const val = (v + 1) * (runtime.BOX_SIZE + runtime.BOX_SIZE / 2);

    offset = val / 2 - runtime.BOX_SIZE / 2;
    offset = -offset;
  });

  runtime.Score.subscribe((v) => {
    if (v < 0) runtime.Score.set(0);
  });

  runtime.Boxes.subscribe((v) => (boxes = v));

  onMount(() => {
    runtime.spawnBox(null, false, true);

    setInterval(() => {
      if (get(runtime.Boxes).length - get(runtime.Clicks) < 21)
        runtime.spawnBox();
    }, 300);
  });

  function fail(e?: Event) {
    if (e) e.preventDefault();

    runtime.clickReset();
  }
</script>

<div class="game fullscreen">
  <div
    class="boxes"
    style="--boxsize: {runtime.BOX_SIZE}px; --boxes-offset: {offset}px;"
  >
    <button class="misclick-trigger" on:click={fail} on:contextmenu={fail} />

    {#if boxes}
      {#each boxes as box}
        <BoxComponent {runtime} {box} />
      {/each}
    {/if}
  </div>
</div>
