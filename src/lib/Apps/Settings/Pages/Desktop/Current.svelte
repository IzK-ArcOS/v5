<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { getWallpaper } from "../../../../../ts/userlogic/wallpapers/main";
  let url = "";

  UserData.subscribe(async () => {
    url = (await getWallpaper($UserData.sh.desktop.wallpaper)).url;
  });
</script>

<div class="current" style="background-image: url({url});">
  <div
    class="fake-taskbar shell-colored"
    class:colored={$UserData.sh.taskbar.colored}
    class:docked={$UserData.sh.taskbar.docked}
  />
  <div class="fake-window">
    <div class="fake-titlebar">Window Title</div>
    <div class="fake-body">Window body</div>
  </div>
</div>
