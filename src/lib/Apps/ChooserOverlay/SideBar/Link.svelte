<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import icon from "../../../../assets/apps/filemanager/folder.svg";
  import type { Writable } from "svelte/store";

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
  <img src={icon} alt={folder.name} />
  <p class="caption">{folder.name}</p>
</button>
