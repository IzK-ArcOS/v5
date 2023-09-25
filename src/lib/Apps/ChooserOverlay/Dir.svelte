<script lang="ts">
  import type { PartialUserDir } from "../../../ts/api/interface";
  import { FolderIcon } from "../../../ts/icon/main";

  export let dir: PartialUserDir;
  export let setDir: (path: string) => void;
</script>

<button class="item dir" on:dblclick={() => setDir(dir.scopedPath)}>
  <div class="image"><img src={FolderIcon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
  <div class="mime">Folder</div>
  <div class="size">-</div>
</button>
