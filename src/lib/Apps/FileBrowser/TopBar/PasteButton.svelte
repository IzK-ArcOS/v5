<script lang="ts">
  import { copyItem } from "../../../../ts/api/fs/mutate";
  import { renameItem } from "../../../../ts/api/fs/rename";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  async function paste() {
    if ($fbState.copyingFilename) {
      const name = $fbState.copyingFilename.name;
      const path = $fbState.copyingFilename.scopedPath;

      await copyItem(path, `${$fbState.currentDir}/${name}`);

      $fbState.copyingFilename = null;
    }

    if ($fbState.cuttingFilename) {
      const name = $fbState.cuttingFilename.name;
      const path = $fbState.cuttingFilename.scopedPath;

      await renameItem(path, `${$fbState.currentDir}/${name}`);

      $fbState.cuttingFilename = null;
    }

    fbClass.refresh();
  }
</script>

<button
  class="material-icons-round paste"
  disabled={(!$fbState.copyingFilename && !$fbState.cuttingFilename) ||
    $fbState.home}
  on:click={paste}
>
  content_paste
</button>
