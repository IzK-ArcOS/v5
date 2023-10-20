<script lang="ts">
  import { onMount } from "svelte";
  import { getParentDirectory } from "../../../../../ts/api/fs/main";
  import type { DirectoryGet } from "../../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../../ts/icon/general";

  export let path: string;

  let name = "";

  onMount(() => {
    name = path
      .replace(getParentDirectory(path), "")
      .replaceAll("/", "")
      .trim();
  });

  function open() {
    fbClass.goToDirectory(path);
  }
</script>

<button
  class="folder"
  on:click={open}
  data-contextmenu="homepage-folder"
  data-path={path}
  disabled={$fbState.refreshing}
>
  <img src={FolderIcon} alt="" />
  <div>
    <p class="title">{name}</p>
  </div>
</button>
