<script lang="ts">
  import {
    FileBrowserCopyingFilename,
    FileBrowserCurrentDir,
    FileBrowserHome,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  function copy() {
    FileBrowserCopyingFilename.set({
      name: $FileBrowserSelectedFilename,
      scopedPath: `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`,
    });
  }
</script>

<button
  class="material-icons-round copy"
  on:click={copy}
  disabled={!$FileBrowserSelectedFilename || $FileBrowserHome}
>
  content_copy
</button>
