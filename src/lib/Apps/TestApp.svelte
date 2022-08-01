<script lang="ts">
  import type { App } from "../../ts/applogic/interface";
  import {
    closeWindow,
    fullscreenWindow,
    headlessToggle,
    maximizeWindow,
    minimizeWindow,
  } from "../../ts/applogic/events";
  import { UserData } from "../../ts/userlogic/interfaces";
  import { get } from "svelte/store";
  import { applyState } from "../../ts/state/main";
  import { logoff } from "../../ts/desktop/power";
  import { updateStores } from "../../ts/applogic/store";
  import { makeNotification } from "../../ts/notiflogic/main";
import { errorMessage } from "../../ts/errorlogic/main";

  export let app: App;

  let state: string;

  function toggleHeadless() {
    headlessToggle(app);
  }

  function min() {
    minimizeWindow(app);
  }

  function max() {
    maximizeWindow(app);
  }

  function cls() {
    closeWindow(app.id);
  }

  function fll() {
    fullscreenWindow(app);
  }

  function toggleTaskbarDocked() {
    const udata = get(UserData);

    udata.sh.taskbar.docked = !udata.sh.taskbar.docked;

    UserData.set(udata);
  }

  function toggleStartSmall() {
    const udata = get(UserData);

    udata.sh.start.small = !udata.sh.start.small;

    UserData.set(udata);
  }

  function toggleAnimations() {
    const udata = get(UserData);

    udata.sh.anim = !udata.sh.anim;

    UserData.set(udata);
  }

  function toggleTaskbarLabels() {
    const udata = get(UserData);

    udata.sh.taskbar.labels = !udata.sh.taskbar.labels;

    UserData.set(udata);
  }

  function updateState() {
    applyState(state);
  }

  function toggleGlass() {
    app.glass = !app.glass;

    updateStores();
  }
</script>

<h1>Testing...<input /></h1>
<p>Headless</p>
<button on:click={toggleHeadless}> headless toggle </button><br />
<p>Window Controls</p>
<button
  on:click={min}
  disabled={app.state.windowState.min || !app.controls.min}
>
  app.state.windowState.min: {app.state.windowState.min}
</button><br />
<button
  on:click={max}
  disabled={app.state.windowState.fll || !app.controls.max}
>
  app.state.windowState.max: {app.state.windowState.max}
</button><br />
<button on:click={fll} disabled={app.state.windowState.max}
  >app.state.windowState.fll: {app.state.windowState.fll}</button
><br />
<button on:click={cls} disabled={!app.controls.cls}>AppLogic.closeWindow</button
><br />
<p>User Data</p>
<button on:click={toggleStartSmall}>
  UserData.sh.start.small: {$UserData.sh.start.small}
</button><br />
<button on:click={toggleTaskbarDocked}>
  UserData.sh.taskbar.docked: {$UserData.sh.taskbar.docked}
</button><br />
<button on:click={toggleAnimations}>
  UserData.sh.anim: {$UserData.sh.anim}
</button><br />
<button on:click={toggleTaskbarLabels}>
  UserData.sh.taskbar.labels: {$UserData.sh.taskbar.labels}
</button>
<p>Change ArcOS State</p>
<input bind:value={state} /><button on:click={updateState}>Update State</button>
<p>Power</p>
<button on:click={logoff}>ArcOS.Desktop.power.logoff</button>
<p>Glass</p>
<button on:click={toggleGlass}>App.glass: {app.glass}</button>
<button
  on:click={() =>
    makeNotification({
      title: `New feature`,
      message: `A new feature update has been released to ArcOS. Do you want to check it out?`,
      buttons: [
        {
          capt: "Learn more",
          action: () => {
            errorMessage("This is a test error message", "This is a test error message to see how the ErrorLogic can work together with the NotificationLogic",{
              caption:"Abort",
              action: () => {}
            },{
              caption:"Retry",
              action: () => {}
            },{
              caption:"Ignore",
              action: () => {}
            },{
              caption:"Cancel",
              action: () => {}
            });
          },
        },
      ],
      icon: "update",
    })}>notif brrr</button
>
