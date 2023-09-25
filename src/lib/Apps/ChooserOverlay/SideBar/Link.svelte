<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import { FolderIcon } from "../../../../ts/icon/main";

  export let folder: PartialUserDir;
  export let setDir: (path: string) => void;
  export let currentPath: Writable<string>;

  let selected = false;

  function doSet() {
    setDir(folder.scopedPath);
  }

  currentPath.subscribe((v) => {
    selected = v == folder.scopedPath;
  });
</script>

<button class="link" on:click={doSet} class:selected>
  <img src={FolderIcon} alt={folder.name} />
  <p class="caption">{folder.name}</p>
</button>
