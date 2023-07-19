<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { DefaultThemes } from "../../../../ts/userlogic/themes/store";
  import { showOverlay } from "../../../../ts/window/overlay";
  import OptionSection from "../OptionSection.svelte";
  import Current from "./Desktop/Current.svelte";
  import AccentColor from "./Personalization/AccentColor.svelte";
  import Themes from "./Personalization/Themes.svelte";
  import ThemeRenderer from "./Personalization/Themes/ThemeRenderer.svelte";
</script>

<h1>Appearance</h1>
<div class="settingspage-themes">
  <div class="desktop-page">
    <Current />
  </div>
  <Themes />
</div>

<OptionSection title="Style" context="Change the style of the UI">
  <select name="aa" id="bb" bind:value={$UserData.sh.desktop.theme}>
    <option value="dark">Darkmode</option>
    <option value="light">Lightmode</option>
    <option value="amoled">Amoled</option>
    <option value="amber">Amber Monochrome</option>
    <option value="scifi">Science Fiction</option>
    <option value="hc">High contrast</option>
  </select>
</OptionSection>

<AccentColor />
