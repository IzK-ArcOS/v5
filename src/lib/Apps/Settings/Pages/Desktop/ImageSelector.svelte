<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  export let wallpaper: [string, string];

  function change() {
    $UserData.sh.desktop.wallpaper = wallpaper[0];
  }
</script>

<div
  class="wallpaper"
  style="background-image: url({wallpaper[1]});"
  class:selected={$UserData.sh.desktop.wallpaper == wallpaper[0]}
  on:click={change}
/>
