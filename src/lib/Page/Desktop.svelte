<script lang="ts">
  import "../../css/desktop.css";
  import { onMount } from "svelte";
  import { UserData } from "../../ts/userlogic/interfaces";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import { loadWindow } from "../../ts/applogic/load";
  import { TestApp } from "../../ts/applogic/apps/testApp";
  import WindowStore from "./Desktop/WindowStore.svelte";

  let show = false;
  let classes = "";
  let udata: UserData;

  UserData.subscribe((v) => {
    udata = v;

    classes = "";

    if (udata.sh.taskbar.docked) classes += `tbdocked `;
    if (!udata.sh.anim) classes += `noani `;
  });

  onMount(() =>
    setTimeout(() => {
      show = true;

      loadWindow("testapp", TestApp);
    }, 1000)
  );
</script>

<div class="desktop theme-darkround fullscreen {classes}" class:show>
  <Wallpaper />
  <Shell />
  <WindowStore />
</div>
