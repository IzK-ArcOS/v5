<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/general";

  export let dir: PartialUserDir;

  function select() {
    $fbState.selectedFilename = dir.name;
  }

  function open() {
    fbClass.goToDirectory(dir.scopedPath);
  }
</script>

<button
  class="tile dir"
  on:click={select}
  on:dblclick={open}
  class:selected={$fbState.selectedFilename == dir.name}
  class:cutting={$fbState.cuttingFilename &&
    $fbState.cuttingFilename.name == dir.name}
  data-path={dir.scopedPath}
  data-type="dir"
  data-name={dir.name}
  data-contextmenu="listitem-dir"
>
  <img src={FolderIcon} alt={dir.name} />
  <p class="name">{dir.name}</p>
</button>
