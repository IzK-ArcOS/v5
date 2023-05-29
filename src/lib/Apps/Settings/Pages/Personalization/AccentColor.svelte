<script lang="ts">
  import { accentColors } from "../../../../../ts/desktop/accent";
  import OptionSection from "../../OptionSection.svelte";
  import Color from "./AccentColor/Color.svelte";
</script>

<OptionSection
  title="Accent Color"
  context="Choose an accent color for ArcOS"
/>
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
