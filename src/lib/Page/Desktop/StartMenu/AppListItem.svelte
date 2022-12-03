<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import {
    OpenApps,
    updateStores,
    WindowStore,
  } from "../../../../ts/applogic/store";
  import { startOpened } from "../../../../ts/desktop/main";
  import type { App } from "../../../../ts/applogic/interface";
  import { isOpened } from "../../../../ts/applogic/checks";

  export let app: App;

  let opened = false;

  function open() {
    openWindow(app.id);

    updateStores();
    startOpened.set(false);
  }

  WindowStore.subscribe(() => {
    opened = !isOpened(app.id);
  });
</script>

<button class="item" on:click={open} disabled={opened}>
  <span class="material-icons"
    >{opened ? "domain_verification" : "web_asset"}</span
  >
  {app.info.name}
</button>
