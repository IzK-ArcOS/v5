<script lang="ts">
  import { openWindow } from "../../../../../ts/applogic/events";
  import { getOriginalIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function open() {
    openWindow(app.id);
  }
</script>

<button class="desktopIcon" on:dblclick={open}>
  <img src={getOriginalIcon(app.id) || app.info.icon} alt={app.info.name} />
  <p class="name">{app.info.name}</p>
</button>
