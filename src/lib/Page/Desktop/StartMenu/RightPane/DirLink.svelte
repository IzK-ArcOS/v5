<script lang="ts">
  import type { PartialUserDir } from "../../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../../ts/applogic/apps/FileBrowser/main";
  import { openWindow } from "../../../../../ts/applogic/events";
  import { startOpened } from "../../../../../ts/desktop/main";
  import { FolderIcon } from "../../../../../ts/icon/general";

  export let dir: PartialUserDir;

  function open() {
    startOpened.set(false);
    openWindow("FileManager");

    setTimeout(() => {
      //$fbState.home = false;
      fbClass.goToDirectory(dir.scopedPath);
    }, 50);
  }
</script>

<button class="link dir" on:click={open}>
  <div class="image"><img src={FolderIcon} alt={dir.name} /></div>
  <div class="caption">{dir.name}</div>
</button>
