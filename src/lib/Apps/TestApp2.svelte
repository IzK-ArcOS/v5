<script lang="ts">
  import { updateStores } from "../../ts/applogic/store";
  import type { App } from "../../ts/applogic/interface";
  import { UserData } from "../../ts/userlogic/interfaces";
  import { get } from "svelte/store";

  export let app: App;

  function toggleHeadless() {
    app.state.headless = !app.state.headless;

    updateStores();
  }

  function toggleFullscreen() {
    app.state.windowState.max = false;
    app.state.windowState.fll = !app.state.windowState.fll;

    updateStores();
  }

  function toggleResizable() {
    app.state.resizable = !app.state.resizable;

    updateStores();
  }

  function toggleMaximize() {
    app.state.windowState.fll = false;
    app.state.windowState.max = !app.state.windowState.max;

    updateStores();
  }

  function toggleMinimize() {
    app.state.windowState.min = !app.state.windowState.min;

    updateStores();
  }

  function toggleGlass() {
    app.glass = !app.glass;

    updateStores();
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

  function toggleMinimizeButton() {
    app.controls.min = !app.controls.min;

    updateStores();
  }

  function toggleMaximizeButton() {
    app.controls.max = !app.controls.max;

    updateStores();
  }

  function toggleCloseButton() {
    app.controls.cls = !app.controls.cls;

    updateStores();
  }

  function removeAllGlass() {
    const udata = get(UserData);

    udata.sh.noGlass = !udata.sh.noGlass;

    UserData.set(udata);
  }
</script>

<h2>ArcOS Testing Application</h2>
<p>
  This application is made to test ArcOS controls and general appearance-related
  functionality. This application is meant for developers that are actively
  working on the project, and will generally not be revealed in any master
  releases.
</p>
<h3>Window</h3>
<button on:click={toggleHeadless}>Headless</button>
<button on:click={toggleFullscreen}>Fullscreen</button>
<button on:click={toggleResizable}>Resizable</button>
<button on:click={toggleMaximize}>Maximize</button>
<button on:click={toggleMinimize}>Minimize</button>
<button on:click={toggleGlass}>Glass</button>
<h3>Shell</h3>
<button on:click={toggleStartSmall}>Small Start</button>
<button on:click={toggleTaskbarDocked}>Docked Taskbar</button>
<button on:click={toggleAnimations}>Animations</button>
<button on:click={toggleTaskbarLabels}>Taskbar Labels</button>
<button on:click={removeAllGlass}>Remove All Glass</button>
<h3>Window Controls</h3>
<button on:click={toggleMinimizeButton}>Min Button</button>
<button on:click={toggleMaximizeButton}>Max Button</button>
<button on:click={toggleCloseButton}>Close Button</button>
<h3>Values</h3>
<table>
  <tr>
    <td>App.state.headless</td>
    <td>{app.state.headless}</td>
  </tr>
  <tr>
    <td>App.state.windowState.fll</td>
    <td>{app.state.windowState.fll}</td>
  </tr>
  <tr>
    <td>App.state.windowState.max</td>
    <td>{app.state.windowState.max}</td>
  </tr>
  <tr>
    <td>App.state.windowState.min</td>
    <td>{app.state.windowState.min}</td>
  </tr>
  <tr>
    <td>App.glass</td>
    <td>{app.glass}</td>
  </tr><br />
  <tr>
    <td>UserData.sh.taskbar.small</td>
    <td>{$UserData.sh.start.small}</td>
  </tr>
  <tr>
    <td>UserData.sh.taskbar.docked&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>{$UserData.sh.taskbar.docked}</td>
  </tr>
  <tr>
    <td>UserData.sh.anim</td>
    <td>{$UserData.sh.anim}</td>
  </tr>
  <tr>
    <td>UserData.sh.noGlass</td>
    <td>{$UserData.sh.noGlass}</td>
  </tr><br />
  <tr>
    <td>App.controls.min</td>
    <td>{app.controls.min}</td>
  </tr>
  <tr>
    <td>App.controls.max</td>
    <td>{app.controls.max}</td>
  </tr>
  <tr>
    <td>App.controls.cls</td>
    <td>{app.controls.cls}</td>
  </tr>
</table>
