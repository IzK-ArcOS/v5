<script lang="ts">
  import folder from "../../../../../assets/apps/filemanager/folder.svg";
  import type { PartialUserDir } from "../../../../../ts/api/interface";
  import { fbClass } from "../../../../../ts/applogic/apps/FileBrowser/main";
  import { createProcess } from "../../../../../ts/applogic/events";
  import { startOpened } from "../../../../../ts/desktop/main";

  export let dir: PartialUserDir;

  function open() {
    startOpened.set(false);
    createProcess("FileManager");

    setTimeout(() => {
      fbClass.goToDirectory(dir.scopedPath);
    });
  }
</script>

<button class="link dir" on:click={open}>
  <div class="image"><img src={folder} alt={dir.name} /></div>
  <div class="caption">{dir.name}</div>
</button>
