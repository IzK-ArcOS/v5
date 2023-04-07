<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { DefaultThemes } from "../../../../ts/userlogic/themes/store";
  import { showOverlay } from "../../../../ts/window/overlay";
  import OptionSection from "../OptionSection.svelte";
  import Current from "./Desktop/Current.svelte";
  import AccentColor from "./Personalization/AccentColor.svelte";
  import ThemeRenderer from "./Theme/ThemeRenderer.svelte";

  let reload = false;

  UserData.subscribe(() => {
    reload = true;
    setTimeout(() => {
      reload = false;
    });
  });
</script>

<h1>Appearance</h1>
<div class="settingspage-themes">
  <div class="desktop-page">
    <Current />
  </div>
  <div class="themes">
    {#if !reload}
      {#each Object.entries(DefaultThemes) as theme}
        <ThemeRenderer {theme} />
      {/each}
      {#if $UserData.sh.userThemes}
        {#each Object.entries($UserData.sh.userThemes) as theme}
          <ThemeRenderer {theme} user />
        {/each}
      {/if}
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button
      class="themerenderer save material-icons-round"
      title="Save current theme"
      on:click={() => showOverlay("saveTheme", "SettingsApp")}>save</button
    >
  </div>
</div>

<OptionSection title="Style" context="Change the style of the UI">
  <select name="aa" id="bb" bind:value={$UserData.sh.desktop.theme}>
    <option value="dark">Darkmode</option>
    <option value="light">Lightmode</option>
    <option value="amoled">Amoled</option>
    <option value="scifi">Science Fiction</option>
    <option value="hc">High contrast</option>
  </select>
</OptionSection>

<AccentColor />
