<script lang="ts">
  import "../../../../css/desktop/apps/settings/desktop.css";
  import { Wallpapers } from "../../../../ts/userlogic/wallpapers/store";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Current from "./LockScreen/Current.svelte";
  import ImageSelector from "./LockScreen/ImageSelector.svelte";

  function custom() {
    showOverlay("customLoginWallpaper", "SettingsApp");
  }
</script>

<div class="desktop-page">
  <Current />
  <div class="wallpapers">
    {#each Object.entries(Wallpapers) as wallpaper}
      <ImageSelector {wallpaper} />
    {/each}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="wallpaper nobg customwp material-icons-round"
      title="Wallpaper from URL"
      on:click={custom}
    >
      travel_explore
    </div>
  </div>
</div>
