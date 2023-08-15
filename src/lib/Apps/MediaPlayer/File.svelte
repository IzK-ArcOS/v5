<script lang="ts">
  import { getMimeIcon } from "../../../ts/api/fs/icon/main";
  import type { ArcFile } from "../../../ts/api/interface";

  export let file: ArcFile;
</script>

<div class="filename" title={file.path}>
  <img src={getMimeIcon(file.name)} alt={file.name} /><span>
    {file.path}
  </span>
</div>
