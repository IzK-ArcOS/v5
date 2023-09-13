<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import type { TileContent } from "../../../ts/applogic/apps/TwentyFourtyEight/interface";

  export let tile: TileContent;

  const topTweened = tweened(
    (tile.new ? tile.position.top : tile.prevPosition.top) / 3,
    {
      duration: 200,
      easing: cubicOut,
    }
  );

  const leftTweened = tweened(
    (tile.new ? tile.position.left : tile.prevPosition.left) / 3,
    {
      duration: 200,
      easing: cubicOut,
    }
  );

  let mergedValue: number = 0;

  // Based on composite rule of three
  $: top = $topTweened * 255;
  $: left = $leftTweened * 255;

  onMount(() => {
    topTweened.set(tile.position?.top / 3);
    leftTweened.set(tile.position?.left / 3);
  });

  const scale = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        const eased = tile.new ? cubicOut(t) : 1;

        return `
          transform: scale(${eased});
          `;
      },
    };
  };
</script>

<div
  class="tile tile-{tile.value}"
  style="top: {top}px; left: {left}px;"
  in:scale={{ duration: 400 }}
>
  <div class="bg" />
  <div class="value">
    {2 ** tile.value}
  </div>
</div>

<style>
  .tile {
    text-align: center;
    line-height: 76px;
    position: absolute;
    width: 76px;
    height: 76px;
    border-radius: 5px;
    transition: none !important;
    /* background-color: var(--accent); */
    overflow: hidden;
  }

  .tile > div {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    font-size: 32px;
    font-weight: bold;
    text-shadow: #000e 0px 0 5px;
    color: #fff;
  }

  .tile-1 .bg {
    background-color: #eee4da;
  }
  .tile-2 .bg {
    background-color: #ede0c8;
  }
  .tile-3 .bg {
    background-color: #f2b179;
  }
  .tile-4 .bg {
    background-color: #f59563;
  }
  .tile-5 .bg {
    background-color: #f67c5f;
  }
  .tile-6 .bg {
    background-color: #f65e3b;
  }
  .tile-7 .bg {
    background-color: #edcf72;
  }
  .tile-8 .bg {
    background-color: #edcc61;
  }
  .tile-9 .bg {
    background-color: #edc850;
  }
  .tile-10 .bg {
    background-color: #edc53f;
  }
  .tile-11 .bg {
    background-color: #f46573;
  }
  .tile-12 .bg {
    background-color: #f14b61;
  }
  .tile-13 .bg {
    background-color: #e9443d;
  }
  .tile-14 .bg {
    background-color: #72b3db;
  }
  .tile-15 .bg {
    background-color: #5da0e4;
  }
  .tile-16 .bg {
    background-color: #027dc0;
  }
</style>
