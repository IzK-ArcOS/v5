<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import folder from "../../../../assets/apps/filemanager/folder.svg";

  export let dir: PartialUserDir;
  export let setDir: (path: string) => void;

  function navigate() {
    setDir(dir.scopedPath);
  }
</script>

<button class="tile dir" on:dblclick={navigate}>
  <img src={folder} alt={dir.name} />
  <p class="caption">{dir.name}</p>
</button>
