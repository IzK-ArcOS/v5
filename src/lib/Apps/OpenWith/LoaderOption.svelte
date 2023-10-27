<script lang="ts">
  import type { ArcFile, UserFileLoader } from "../../../ts/api/interface";
  import { OpenWithFile } from "../../../ts/applogic/apps/OpenWith";
  import { closeWindow } from "../../../ts/applogic/events";
  import type { App } from "../../../ts/applogic/interface";
  import sleep from "../../../ts/sleep";

  export let loader: UserFileLoader;
  export let selected = "";
  export let loaderOptions: UserFileLoader[];
  export let options: App[];

  function select() {
    selected = loader.name;
  }

  async function openThis() {
    loader.loader($OpenWithFile);
    /* 
    setTimeout(() => {
      OpenWithFile.set(null);
    }, 1000);
 */
    await sleep(100);
    closeWindow("OpenWithApp");

    loaderOptions = [];
    options = [];
  }
</script>

<button
  class="option loader"
  on:click={select}
  on:dblclick={openThis}
  class:selected={selected == loader.name}
>
  <div class="icon"><img src={loader.icon} alt={loader.name} /></div>
  <div>
    <div class="name">{loader.name}</div>
    <div class="description">{loader.description}</div>
  </div>
</button>
