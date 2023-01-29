<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import { FileBrowserSelectedFilename } from "../../../../ts/applogic/apps/FileBrowser/main";
  import icon from "../../../../assets/apps/filemanager/folder.svg";

  export let dir: PartialUserDir;

  function select() {
    $FileBrowserSelectedFilename = dir.name;
  }
</script>

<button
  class="item dir"
  on:click={select}
  class:selected={$FileBrowserSelectedFilename == dir.name}
>
  <div class="image"><img src={icon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
</button>
