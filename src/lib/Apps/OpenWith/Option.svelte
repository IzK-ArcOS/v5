<script lang="ts">
  import { openWith } from "../../../ts/api/fs/open";
  import { OpenWithFile } from "../../../ts/applogic/apps/OpenWith";
  import { closeWindow } from "../../../ts/applogic/events";
  import type { App, ArcFile } from "../../../ts/applogic/interface";

  export let app: App;
  export let file: ArcFile;
  export let selected = "";

  function select() {
    selected = app.id;
  }

  function openThis() {
    openWith(app.id, file, file.anymime);

    setTimeout(() => {
      OpenWithFile.set(null);
    }, 1000);
    closeWindow("OpenWithApp");
  }
</script>

<button
  class="option"
  on:click={select}
  on:dblclick={openThis}
  class:selected={selected == app.id}
>
  <div class="icon"><img src={app.info.icon} alt={app.info.name} /></div>
  <div>
    <div class="name">{app.info.name}</div>
    <div class="description">{app.info.description}</div>
  </div>
  <div class="id">{app.id}</div>
</button>
