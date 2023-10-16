<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    FileBrowserSelectedFilename,
    FileBrowserCuttingFilename as cutting,
    fbClass,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/general";

  export let dir: PartialUserDir;

  function select() {
    $FileBrowserSelectedFilename = dir.name;
  }

  function open() {
    fbClass.goToDirectory(dir.scopedPath);
  }
</script>

<button
  class="tile dir"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == dir.name}
  class:cutting={$cutting && $cutting.name == dir.name}
  data-path={dir.scopedPath}
  data-type="dir"
  data-name={dir.name}
  data-contextmenu="listitem-dir"
>
  <img src={FolderIcon} alt={dir.name} />
  <p class="name">{dir.name}</p>
</button>
