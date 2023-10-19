<script lang="ts">
  import { onMount } from "svelte";
  import { getDirectory } from "../../../../../ts/api/fs/directory";
  import type { DirectoryGet } from "../../../../../ts/api/interface";
  import { getParentDirectory } from "../../../../../ts/api/fs/main";
  import { FolderIcon } from "../../../../../ts/icon/general";
  import { fbClass } from "../../../../../ts/applogic/apps/FileBrowser/main";

  export let path: string;

  let dir: DirectoryGet;
  let name = "";

  onMount(() => {
    const split = path.split("/").filter((p) => !!p);

    name = path
      .replace(getParentDirectory(path), "")
      .replaceAll("/", "")
      .trim();
  });

  function open() {
    fbClass.goToDirectory(path);
  }
</script>

<button class="folder" on:click={open}>
  <img src={FolderIcon} alt="" />
  <div>
    <p class="title">{name}</p>
  </div>
</button>
