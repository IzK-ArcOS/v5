<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  export let wallpaper: [string, string];

  function change() {
    $UserData.sh.desktop.wallpaper = wallpaper[0];
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="wallpaper"
  style="background-image: url({wallpaper[1]});"
  title={wallpaper[0]}
  class:selected={$UserData.sh.desktop.wallpaper == wallpaper[0]}
  on:click={change}
/>
