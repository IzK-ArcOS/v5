<script>
  import "../../../../css/desktop/apps/settings/themes.css";
  import { DefaultThemes } from "../../../../ts/userlogic/themes/store";
  import Current from "./Desktop/Current.svelte";
  import ThemeRenderer from "./Theme/ThemeRenderer.svelte";
</script>

<div class="settingspage-themes">
  <h1>Themes</h1>
  <div class="desktop-page">
    <Current />
  </div>
  <div class="themes">
    {#each Object.entries(DefaultThemes) as theme}
      <ThemeRenderer {theme} />
    {/each}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      class="themerenderer save material-icons-round"
      title="Save current theme">save</button
    >
  </div>
</div>
