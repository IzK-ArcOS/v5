<script lang="ts">
  import "../../../../css/desktop/apps/settings/desktop.css";
  import { Wallpapers } from "../../../../ts/userlogic/wallpapers";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Current from "./Desktop/Current.svelte";
  import ImageSelector from "./Desktop/ImageSelector.svelte";

  function custom() {
    showOverlay("customWallpaper", "SettingsApp");
  }
</script>

<div class="desktop-page">
  <h1>Wallpaper</h1>
  <Current />
  <div class="wallpapers">
    {#each Object.entries(Wallpapers) as wallpaper}
      <ImageSelector {wallpaper} />
    {/each}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="wallpaper nobg customwp material-icons-round" on:click={custom}>
      add
    </div>
  </div>
</div>
