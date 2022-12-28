<script lang="ts">
  import { openWindow } from "../../../../ts/applogic/events";
  import type { App } from "../../../../ts/applogic/interface";
  import { updateStores } from "../../../../ts/applogic/store";
  import { startOpened } from "../../../../ts/desktop/main";

  export let app: App;

  function open() {
    openWindow(app.id);

    updateStores();
    startOpened.set(false);
  }
</script>

<button class="item" on:click={open} disabled={app.opened}>
  <img src={app.info.icon} class="icon" alt={app.info.name} />
  {app.info.name}
</button>
