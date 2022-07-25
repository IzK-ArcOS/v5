<script lang="ts">
  import "../../css/desktop.css";
  import { onMount } from "svelte";
  import { UserData } from "../../ts/userlogic/interfaces";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
import Shell from "./Desktop/Shell.svelte";

  let show = false;
  let classes = "";
  let udata: UserData;

  UserData.subscribe((v) => {
    udata = v;

    classes = "";

    if (udata.sh.taskbar.docked) classes += `tbdocked `;
    if (!udata.sh.anim) classes += `noani `;
  });

  onMount(() => setTimeout(() => (show = true), 1000));
</script>

<div class="desktop theme-darkround fullscreen {classes}" class:show>
  <Wallpaper />
  <Shell/>
</div>
