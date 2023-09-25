<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import { FolderIcon } from "../../../../ts/icon/main";

  export let dir: PartialUserDir;
  export let setDir: (path: string) => void;

  function navigate() {
    setDir(dir.scopedPath);
  }
</script>

<button class="tile dir" on:dblclick={navigate}>
  <img src={FolderIcon} alt={dir.name} />
  <p class="caption">{dir.name}</p>
</button>
