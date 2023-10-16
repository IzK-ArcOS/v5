<script lang="ts">
  import {
    FileBrowserCurrentDir,
    FileBrowserCuttingFilename,
    FileBrowserHome,
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
  disabled={!$FileBrowserSelectedFilename || $FileBrowserHome}
  >content_cut</button
>
