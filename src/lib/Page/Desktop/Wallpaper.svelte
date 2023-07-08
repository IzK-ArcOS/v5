<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../ts/userlogic/wallpapers/main";
  import DesktopIcons from "./Shell/DesktopIcons.svelte";
  import SnapZones from "./Wallpaper/SnapZones.svelte";

  let url = "";

  UserData.subscribe(async () => {
    const u = (await getWallpaper($UserData.sh.desktop.wallpaper)).url;

    if (u != url) url = u;
  });
</script>

<div
  class="wallpaper fullscreen"
  style="background-image: url({url});"
  data-caller="shell-wallpaper"
>
  <DesktopIcons />
</div>

<!-- <SnapZones /> -->
