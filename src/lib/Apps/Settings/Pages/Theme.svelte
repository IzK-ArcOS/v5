<script>
  import "../../../../css/desktop/apps/settings/themes.css";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { DefaultThemes } from "../../../../ts/userlogic/themes/store";
  import { showOverlay } from "../../../../ts/window/overlay";
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
    {#if $UserData.sh.userThemes}
      {#each Object.entries($UserData.sh.userThemes) as theme}
        <ThemeRenderer {theme} user />
      {/each}
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      class="themerenderer save material-icons-round"
      title="Save current theme"
      on:click={() => showOverlay("saveTheme", "SettingsApp")}>save</button
    >
  </div>
</div>
