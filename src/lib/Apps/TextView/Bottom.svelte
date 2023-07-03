<script lang="ts">
  import { formatBytes } from "../../../ts/api/fs/sizes";
  import type { Process } from "../../../ts/applogic/interface";
  export let fileContents: string;
  export let process: Process;
</script>

<div class="bottom">
  <div class="right">
    <div class="section">
      Size: {formatBytes(fileContents.length)}
    </div>
    <div class="section">
      {process.openedFile.name}
    </div>
    <div class="section">
      {process.openedFile.mime.split(";")[0]}
    </div>
  </div>
</div>
