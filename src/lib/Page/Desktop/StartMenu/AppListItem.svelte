<script lang="ts">
  import { createProcess, openWindow } from "../../../../ts/applogic/events";
  import { getAppIcon, getOriginalIcon } from "../../../../ts/applogic/icon";
  import type { App } from "../../../../ts/applogic/interface";
  import { updateStores } from "../../../../ts/applogic/store";
  import { startOpened } from "../../../../ts/desktop/main";

  export let app: App;
  export let onopen = () => {};

  function open() {
    createProcess(app.id);

    updateStores();
    startOpened.set(false);
    onopen();
  }
</script>

<button class="item" on:click={open}>
  <img src={getAppIcon(app)} class="icon" alt={app.info.name} />
  {app.info.name}
</button>
