<script lang="ts">
  import { updateStores } from "../../ts/applogic/store";
  import type { App } from "../../ts/applogic/interface";
  import { closeWindow } from "../../ts/applogic/events";
import { UserData } from "../../ts/userlogic/interfaces";
import { get } from "svelte/store";

  export let app: App;

  function toggleHeadless() {
    app.state.headless = !app.state.headless;

    console.log(app);

    updateStores();
  }

  function min() {
    app.state.windowState.min = !app.state.windowState.min;

    updateStores();
  }

  function max() {
    app.state.windowState.max = !app.state.windowState.max;

    updateStores();
  }
  function cls() {
    closeWindow(app.id);
  }

  function fll () {
    app.state.windowState.fll = !app.state.windowState.fll;

    updateStores();
  }
  
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

<h1>Testing...</h1>
<button on:click={toggleHeadless}> headless toggle </button>
<button on:click={min}>min</button>
<button on:click={max}>max</button>
<button on:click={cls}>cls</button>
<button on:click={fll}>fll</button>
<button on:click={startSizTog}>
  UserData.sh.start.small: {$UserData.sh.start.small}
</button><br/>
<button on:click={tog}>
  UserData.sh.taskbar.docked: {$UserData.sh.taskbar.docked}
</button><br />
<button on:click={togani}>
  UserData.sh.anim: {$UserData.sh.anim}
</button><br />
<input />
