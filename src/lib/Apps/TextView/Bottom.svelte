<script lang="ts">
  import { formatBytes } from "../../../ts/api/fs/sizes";
  import type { App } from "../../../ts/applogic/interface";
  export let fileContents: string;
  export let app: App;
</script>

<div class="bottom">
  <div class="right">
    <div class="section">
      Size: {formatBytes(fileContents.length)}
    </div>
    <div class="section">
      {app.openedFile.name}
    </div>
    <div class="section">
      {app.openedFile.mime.split(";")[0]}
    </div>
  </div>
</div>
