<script lang="ts">
  import icon from "../../../../assets/apps/filemanager/folder.svg";
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCurrentDir
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  export let folder: PartialUserDir;

  let selected = false;

  async function switchTo() {
    fbClass.goToDirectory(folder.scopedPath);
  }

  FileBrowserCurrentDir.subscribe((v) => {
    const path = v.replace("./", "");

    selected = path.startsWith(folder.name);
  });
</script>

<button class="folder" class:selected on:click={switchTo}>
  <img src={icon} alt={folder.name} />
  <p class="name">{folder.name}</p>
</button>
