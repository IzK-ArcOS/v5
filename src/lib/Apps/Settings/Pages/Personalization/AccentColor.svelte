<script>
  import { accentColors } from "../../../../../ts/desktop/accent";
  import Section from "../../Section.svelte";
  import Color from "./AccentColor/Color.svelte";
</script>

<p class="context">Choose an accent color for ArcOS:</p>
<div class="wrapper">
  {#each accentColors as color}
    <Color {color} />
  {/each}
</div>

<style scoped>
  div.wrapper {
    margin: 10px 0;
    display: grid;
    grid-template-columns: repeat(12, 35px);
  }
</style>
