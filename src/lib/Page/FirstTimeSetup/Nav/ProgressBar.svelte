<script lang="ts">
  import { onMount } from "svelte";

  export let val: number;
  export let max: number;

  let outer: HTMLDivElement;

  let css = "";

  onMount(() => {
    const totalWidth = outer.offsetWidth;
    const width = (totalWidth / max) * val;

    css = `width: ${width}px;`;
  });
</script>

<div class="alc">
  <div class="progress" bind:this={outer}>
    <div class="inner" style={css} />
  </div>
</div>
