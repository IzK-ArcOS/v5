<script>
  import { copyItem } from "../../../../ts/api/fs/mutate";
  import { renameItem } from "../../../../ts/api/fs/rename";
  import {
    fbClass,
    FileBrowserCopyingFilename,
    FileBrowserCurrentDir,
    FileBrowserCuttingFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  async function paste() {
    if ($FileBrowserCopyingFilename) {
      const name = $FileBrowserCopyingFilename.name;
      const path = $FileBrowserCopyingFilename.scopedPath;

      await copyItem(path, `${$FileBrowserCurrentDir}/${name}`);

      FileBrowserCopyingFilename.set(null);
    }

    if ($FileBrowserCuttingFilename) {
      const name = $FileBrowserCuttingFilename.name;
      const path = $FileBrowserCuttingFilename.scopedPath;

      await renameItem(path, `${$FileBrowserCurrentDir}/${name}`);

      FileBrowserCuttingFilename.set(null);
    }

    fbClass.refresh();
  }
</script>

<button
  class="material-icons-round paste"
  disabled={!$FileBrowserCuttingFilename && !$FileBrowserCopyingFilename}
  on:click={paste}>content_paste</button
>
