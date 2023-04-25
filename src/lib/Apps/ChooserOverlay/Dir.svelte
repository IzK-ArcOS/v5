<script lang="ts">
  import icon from "../../../assets/apps/filemanager/folder.svg";
  import type { PartialUserDir } from "../../../ts/api/interface";

  export let dir: PartialUserDir;
  export let setDir: (path: string) => void;
</script>

<button class="item dir" on:dblclick={() => setDir(dir.scopedPath)}>
  <div class="image"><img src={icon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
  <div class="mime">Folder</div>
  <div class="size">-</div>
</button>
