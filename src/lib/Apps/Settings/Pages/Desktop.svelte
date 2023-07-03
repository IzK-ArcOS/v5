<script lang="ts">
  import { get } from "svelte/store";
  import "../../../../css/desktop/apps/settings/desktop.css";
  import { createDirectory } from "../../../../ts/api/fs/directory";
  import { directSingleUpload } from "../../../../ts/api/upload";
  import { showOverlay } from "../../../../ts/window/overlay";
  import Current from "./Desktop/Current.svelte";
  import ImageSelector from "./Desktop/ImageSelector.svelte";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import FilesystemWallpapers from "./Desktop/FilesystemWallpapers.svelte";
  import { Wallpapers } from "../../../../ts/userlogic/wallpapers/store";
  import type { Process } from "../../../../ts/applogic/interface";

  export let process: Process;

  function custom() {
    showOverlay("customWallpaper", process.id);
  }

  async function upload() {
    await createDirectory("./Wallpapers");

    const path = await directSingleUpload(
      "./Wallpapers",
      "image/png, image/jpeg, image/gif, image/svg+xml"
    );

    const udata = get(UserData);

    udata.sh.desktop.wallpaper = `@local:${btoa(path)}`;

    UserData.set(udata);
  }
</script>

<div class="desktop-page">
  <h1>Wallpaper</h1>
  <Current />
  <div class="wallpapers">
    {#each Object.entries(Wallpapers) as wallpaper}
      <ImageSelector {wallpaper} />
    {/each}
    <FilesystemWallpapers />
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
