<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../../../ts/userlogic/wallpapers";
</script>

<div
  class="current"
  style="background-image: url({getWallpaper($UserData.sh.desktop.wallpaper)});"
/>
