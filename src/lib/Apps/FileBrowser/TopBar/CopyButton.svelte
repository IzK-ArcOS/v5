<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";

  function copy() {
    $fbState.copyingFilename = {
      name: $fbState.selectedFilename,
      scopedPath: `${$fbState.currentDir}/${$fbState.selectedFilename}`,
    };
  }
</script>

<button
  class="material-icons-round copy"
  on:click={copy}
  disabled={!$fbState.selectedFilename || $fbState.home}
>
  content_copy
</button>
