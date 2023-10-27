<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { App } from "../../../../ts/applogic/interface";
  import { ScopedAppData, UserData } from "../../../../ts/userlogic/interfaces";

  export let appdata: ScopedAppData;
  export let app: App;

  function changeView(newState: boolean) {
    return () => {
      appdata.tiled = newState;

      $UserData.appdata[app.id] = appdata;
    };
  }
</script>

<div class="group">
  <button
    class="material-icons-round"
    class:selected={!appdata.tiled}
    on:click={changeView(false)}
    title="List view"
    disabled={$fbState.home}
  >
    format_list_bulleted
  </button>
  <button
    class="material-icons-round"
    class:selected={appdata.tiled}
    on:click={changeView(true)}
    title="Tile view"
    disabled={$fbState.home}
  >
    grid_view
  </button>
</div>
