<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../ts/userlogic/wallpapers/main";
  import DesktopIcons from "./Shell/DesktopIcons.svelte";
  import NewDesktopIcons from "./Shell/NewDesktopIcons.svelte";
  import SnapZones from "./Wallpaper/SnapZones.svelte";

  let url = "";

  let previous = "";

  UserData.subscribe(async () => {
    const wallpaper = $UserData.sh.desktop.wallpaper;

    if (previous == wallpaper) return;

    previous = wallpaper;

    const u = (await getWallpaper(wallpaper)).url;

    if (u != url) url = u;
  });
</script>

<div
  class="wallpaper fullscreen"
  style="background-image: url({url});"
  data-contextmenu="shell-wallpaper"
>
  <!-- <DesktopIcons /> -->
  <NewDesktopIcons />
</div>

<!-- <SnapZones /> -->
