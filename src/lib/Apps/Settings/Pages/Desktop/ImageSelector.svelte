<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import type { Wallpaper } from "../../../../../ts/userlogic/wallpapers/interface";

  export let wallpaper: [string, Wallpaper];

  function change() {
    $UserData.sh.desktop.wallpaper = wallpaper[0];
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="wallpaper"
  style="background-image: url({wallpaper[1].url});"
  title={wallpaper[0] == "img0"
    ? "(none)"
    : `${wallpaper[1].name} from ${wallpaper[1].author}`}
  class:selected={$UserData.sh.desktop.wallpaper == wallpaper[0]}
  on:click={change}
>
  {#if wallpaper[0] == "img0"}
    <span class="material-icons-round none">block</span>
  {/if}
</div>
