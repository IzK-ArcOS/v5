<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import { get } from "svelte/store";
  import { startOpened } from "../../../ts/desktop/main";

  function tog() {
    const udata = get(UserData);

    udata.sh.taskbar.docked = !udata.sh.taskbar.docked;

    UserData.set(udata);
  }

  

  function startSizTog() {
    const udata = get(UserData);

    udata.sh.start.small = !udata.sh.start.small;

    UserData.set(udata);
  }

  function togani() {
    const udata = get(UserData);

    udata.sh.anim = !udata.sh.anim;

    UserData.set(udata);
  }
</script>

<div class="wallpaper fullscreen">
  <button on:click={startSizTog}>
    UserData.sh.start.small: {$UserData.sh.start.small}
  </button><br/>
  <button on:click={tog}>
    UserData.sh.taskbar.docked: {$UserData.sh.taskbar.docked}
  </button><br />
  <button on:click={togani}>
    UserData.sh.anim: {$UserData.sh.anim}
  </button><br />

</div>
