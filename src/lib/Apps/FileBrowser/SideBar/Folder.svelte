<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/general";

  export let folder: PartialUserDir;

  let selected = false;

  async function switchTo() {
    fbClass.goToDirectory(folder.scopedPath);
  }

  fbState.subscribe((v) => {
    const path = v.currentDir.replace("./", "");

    selected = path.startsWith(folder.name);
  });
</script>

<button
  class="folder"
  class:selected={selected && !$fbState.home}
  on:click={switchTo}
  disabled={$fbState.refreshing}
>
  <img src={FolderIcon} alt={folder.name} />
  <p class="name">{folder.name}</p>
</button>
