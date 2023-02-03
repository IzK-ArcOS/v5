<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
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
  class="item dir"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == dir.name}
>
  <div class="image"><img src={icon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
  <div class="mime">Folder</div>
  <div class="size">-</div>
</button>
