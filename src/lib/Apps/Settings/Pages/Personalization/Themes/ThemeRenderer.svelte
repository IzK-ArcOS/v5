<script lang="ts">
  import { onMount } from "svelte";
  import type { UserTheme } from "../../../../../../ts/userlogic/themes/interface";
  import { loadTheme } from "../../../../../../ts/userlogic/themes/main";
  import { getWallpaper } from "../../../../../../ts/userlogic/wallpapers";

  export let theme: [string, UserTheme];
  export let user = false;

  let url = "";

  function apply() {
    loadTheme(theme[1]);
  }

  onMount(async () => {
    url = await getWallpaper(theme[1].wallpaper);
  });
</script>

<button
  class="themerenderer"
  class:sharp={theme[1].sharp}
  on:click={apply}
  title="{theme[1].name} by {theme[1].author}"
  style="background-image: url({url}); --accent: #{theme[1].accent}"
  data-id={theme[0]}
  data-caller="themerenderer-{user ? 'user' : 'system'}"
  data-name={theme[1].name}
  data-json={JSON.stringify(theme[1])}
>
  <div class="mockup-window theme-{theme[1].theme}">
    <div class="accent" style="color: {theme[1].accent}" />
  </div>
</button>
