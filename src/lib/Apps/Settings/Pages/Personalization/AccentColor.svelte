<script>
  import { accentColors } from "../../../../../ts/desktop/accent";
  import Section from "../../Section.svelte";
  import Color from "./AccentColor/Color.svelte";
</script>

<Section header="Accent Color">
  <p class="context">Choose an accent color for ArcOS:</p>
  {#each accentColors as color}
    <Color {color} />
  {/each}
</Section>
