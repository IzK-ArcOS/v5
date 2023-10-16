<script lang="ts">
  import { getParentDirectory } from "../../../../ts/api/fs/main";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserHome,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  function parentdir() {
    fbClass.goToDirectory(getParentDirectory($FileBrowserCurrentDir));
  }
</script>

<button
  class="material-icons-round parentdir"
  on:click={parentdir}
  disabled={$FileBrowserCurrentDir == "./" || $FileBrowserHome}
  title="Parent folder"
>
  arrow_upward
</button>
