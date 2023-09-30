<script lang="ts">
  import { get } from "svelte/store";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { toBase64 } from "../../../../../../ts/base64";

  export let wallpaper: { url: string; path: string };

  const wallString = (path: string) => `@local:${toBase64(path)}`;

  function apply() {
    UserData.update((udata) => {
      udata.sh.desktop.wallpaper = wallString(wallpaper.path);

      return udata;
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="wallpaper"
  style="background-image: url({wallpaper.url});"
  title={wallpaper.path}
  class:selected={$UserData.sh.desktop.wallpaper == wallString(wallpaper.path)}
  on:click={apply}
  data-contextmenu="wallpaper-custom"
/>
