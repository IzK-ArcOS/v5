<script lang="ts">
  import { getParentDirectory } from "../../../../ts/api/fs/main";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";

  function parentdir() {
    fbClass.goToDirectory(getParentDirectory($fbState.currentDir));
  }
</script>

<button
  class="material-icons-round parentdir"
  on:click={parentdir}
  disabled={$fbState.currentDir == "./" || $fbState.home}
  title="Parent folder"
>
  arrow_upward
</button>
