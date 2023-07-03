<script lang="ts">
  import { createProcess } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;

  function open() {
    createProcess(app.id);
  }
</script>

<button class="desktopIcon" on:dblclick={open}>
  <img src={app.info.icon} alt={app.info.name} />
  <p class="name">{app.info.name}</p>
</button>
