<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import type { ThemeStore } from "../../../../../ts/userlogic/themes/interface";
  import { DefaultThemes } from "../../../../../ts/userlogic/themes/store";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import ThemeRenderer from "./Themes/ThemeRenderer.svelte";

  let oldlength = 0;

  let reload = false;

  UserData.subscribe((v) => {
    const freshEntries = Object.entries(v.sh.userThemes);

    if (oldlength == freshEntries.length) return;

    oldlength = freshEntries.length;

    reload = true;

    setTimeout(() => {
      reload = false;
    });
  });
</script>

<div class="themes">
  {#each Object.entries(DefaultThemes) as theme}
    <ThemeRenderer {theme} />
  {/each}
  {#if !reload && $UserData.sh.userThemes}
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
