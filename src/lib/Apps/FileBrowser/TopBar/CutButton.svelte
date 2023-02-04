<script lang="ts">
  import {
    FileBrowserCurrentDir,
    FileBrowserCuttingFilename,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  function cut() {
    FileBrowserCuttingFilename.set({
      name: $FileBrowserSelectedFilename,
      scopedPath: `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`,
    });
  }
</script>

<button
  class="material-icons-round cut"
  on:click={cut}
  disabled={!$FileBrowserSelectedFilename}>content_cut</button
>
