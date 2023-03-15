<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../ts/userlogic/wallpapers";
  import DesktopIcons from "./Shell/DesktopIcons.svelte";
  import SnapZones from "./Wallpaper/SnapZones.svelte";
</script>

<div
  class="wallpaper fullscreen"
  style="background-image: url({getWallpaper($UserData.sh.desktop.wallpaper)});"
  data-caller="shell-wallpaper"
>
  <DesktopIcons />
</div>

<SnapZones />
