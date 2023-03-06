<script lang="ts">
  import type { UserTheme } from "../../../../../ts/userlogic/themes/interface";
  import { loadTheme } from "../../../../../ts/userlogic/themes/main";
  import { getWallpaper } from "../../../../../ts/userlogic/wallpapers";

  export let theme: [string, UserTheme];

  function apply() {
    loadTheme(theme[1]);
  }
</script>

<button
  class="themerenderer"
  class:sharp={theme[1].sharp}
  on:click={apply}
  title="{theme[1].name} by {theme[1].author}"
  style="background-image: url({getWallpaper(
    theme[1].wallpaper
  )}); --accent: #{theme[1].accent}"
>
  <div class="mockup-window theme-{theme[1].theme}">
    <div class="accent" style="color: {theme[1].accent}" />
  </div>
</button>
