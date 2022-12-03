<script lang="ts">
  import { isMinimized } from "../../../../ts/applogic/checks";
  import { OpenApps, updateStores } from "../../../../ts/applogic/store";
  import type { App } from "../../../../ts/applogic/interface";
  import { UserData } from "../../../../ts/userlogic/interfaces";

  export let app: App;

  let showLabel = false;
  let minimized = false;

  UserData.subscribe((v) => {
    showLabel = v.sh.taskbar.labels;
  });

  OpenApps.subscribe(() => {
    minimized = isMinimized(app.id);
  });

  function e() {
    app.state.windowState.min = !app.state.windowState.min;

    updateStores();
  }
</script>

<button class="appbutton" class:minimized on:click={e}>
  <span class="material-icons">web_asset</span>
  {#if showLabel}
    <span>{app.info.name}</span>
  {/if}
</button>
