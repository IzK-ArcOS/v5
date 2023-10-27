<script lang="ts">
  import "../../../../../css/desktop/apps/settings/accentcolor.css";
  import { accentColors } from "../../../../../ts/desktop/accent";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import OptionSection from "../../OptionSection.svelte";
  import Color from "./AccentColor/Color.svelte";

  function custom() {
    showOverlay("customAccentColor", "SettingsApp");
  }
</script>

<OptionSection
  title="Accent Color"
  context="Choose an accent color for ArcOS"
/>
<div class="accentcolor-wrapper">
  {#each accentColors as color}
    <Color {color} />
  {/each}
  <button class="color ol reset material-icons-round" on:click={custom}
    >edit</button
  >
</div>
