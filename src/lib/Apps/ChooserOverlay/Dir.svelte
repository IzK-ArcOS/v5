<script lang="ts">
  import type { PartialUserDir } from "../../../ts/api/interface";
  import icon from "../../../assets/apps/filemanager/folder.svg";
  import type { Writable } from "svelte/store";

  export let dir: PartialUserDir;
  export let setDir: (path: string) => void;
  export let selected: Writable<string>;
</script>

<button class="item dir" on:dblclick={() => setDir(dir.scopedPath)}>
  <div class="image"><img src={icon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
  <div class="mime">Folder</div>
  <div class="size">-</div>
</button>
