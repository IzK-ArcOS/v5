<script>
  import { accentColors } from "../../../../../ts/desktop/accent";
  import Section from "../../Section.svelte";
  import Color from "./AccentColor/Color.svelte";
</script>

<div class="wrapper">
  <p class="context">Choose an accent color for ArcOS:</p>
  {#each accentColors as color}
    <Color {color} />
  {/each}
</div>

<style scoped>
  div.wrapper {
    margin: 10px 0;
  }
</style>
