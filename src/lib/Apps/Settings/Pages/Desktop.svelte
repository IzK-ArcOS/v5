<script lang="ts">
  import "../../../../css/desktop/apps/settings/desktop.css";
  import { Wallpapers } from "../../../../ts/userlogic/wallpapers";
  import Section from "../Section.svelte";
  import Current from "./Desktop/Current.svelte";
  import Custom from "./Desktop/Custom.svelte";
  import ImageSelector from "./Desktop/ImageSelector.svelte";
</script>

<div class="desktop-page">
  <h1>Wallpaper</h1>
  <Current />
  <p class="context">Built-in wallpapers:</p>
  <div class="wallpapers">
    {#each Object.entries(Wallpapers) as wallpaper}
      <ImageSelector {wallpaper} />
    {/each}
  </div>
  <Custom />
</div>
