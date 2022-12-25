<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import { OpenApps, updateStores } from "../../../../ts/applogic/store";
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

  OpenApps.subscribe(() => {
    opened = isOpened(app.id);
  });
</script>

<button class="item" on:click={open} disabled={opened}>
  <img src={app.info.icon} class="icon" alt={app.info.name} />
  {app.info.name}
</button>
