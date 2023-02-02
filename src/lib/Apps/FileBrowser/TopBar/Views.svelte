<script lang="ts">
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
  >
    format_list_bulleted
  </button>
  <button
    class="material-icons-round"
    class:selected={appdata.tiled}
    on:click={changeView(true)}
  >
    grid_view
  </button>
</div>
