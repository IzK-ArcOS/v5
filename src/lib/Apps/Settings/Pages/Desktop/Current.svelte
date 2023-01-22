<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../../../ts/userlogic/wallpapers";
</script>

<div
  class="current"
  style="background-image: url({getWallpaper($UserData.sh.desktop.wallpaper)});"
>
  <div class="fake-taskbar" />
  <div class="fake-window">
    <div class="fake-titlebar">Window Title</div>
    <div class="fake-body">Window body</div>
  </div>
</div>
