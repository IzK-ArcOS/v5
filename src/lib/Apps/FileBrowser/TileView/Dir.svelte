<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    FileBrowserSelectedFilename,
    FileBrowserCuttingFilename as cutting,
    fbClass,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/main";

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
>
  <img src={FolderIcon} alt={dir.name} />
  <p class="name">{dir.name}</p>
</button>
