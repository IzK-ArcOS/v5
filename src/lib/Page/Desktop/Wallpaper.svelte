<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../ts/userlogic/wallpapers";
  import DesktopIcons from "./Shell/DesktopIcons.svelte";
  import SnapZones from "./Wallpaper/SnapZones.svelte";

  let url = "";

  UserData.subscribe(async () => {
    url = await getWallpaper($UserData.sh.desktop.wallpaper);
  });
</script>

<div
  class="wallpaper fullscreen"
  style="background-image: url({url});"
  data-caller="shell-wallpaper"
>
  <DesktopIcons />
</div>

<SnapZones />
