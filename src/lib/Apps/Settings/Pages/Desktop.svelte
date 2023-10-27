<script lang="ts">
  import "../../../../css/desktop/apps/settings/desktop.css";
  import { createDirectory } from "../../../../ts/api/fs/directory";
  import { directSingleUpload } from "../../../../ts/api/upload";
  import { toBase64 } from "../../../../ts/base64";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { Wallpapers } from "../../../../ts/userlogic/wallpapers/store";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Current from "./Desktop/Current.svelte";
  import ImageSelector from "./Desktop/ImageSelector.svelte";

  function custom() {
    showOverlay("customWallpaper", "SettingsApp");
  }

  async function upload() {
    await createDirectory("./Wallpapers");

    const path = await directSingleUpload(
      "./Wallpapers",
      "image/png, image/jpeg, image/gif, image/svg+xml"
    );

    UserData.update((udata) => {
      udata.sh.desktop.wallpaper = `@local:${toBase64(path)}`;

      return udata;
    });
  }
</script>

<div class="desktop-page">
  <Current />
  <div class="wallpapers">
    {#each Object.entries(Wallpapers) as wallpaper}
      <ImageSelector {wallpaper} />
    {/each}
    <!-- <FilesystemWallpapers /> -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="wallpaper nobg customwp material-icons-round"
      title="Upload wallpaper"
      on:click={upload}
    >
      upload
    </div>
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
