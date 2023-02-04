<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCuttingFilename as cutting,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import icon from "../../../../assets/apps/filemanager/folder.svg";

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
  <img src={icon} alt={dir.name} />
  <p class="name">{dir.name}</p>
</button>
