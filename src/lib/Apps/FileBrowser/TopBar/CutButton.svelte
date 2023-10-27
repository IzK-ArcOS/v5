<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";

  function cut() {
    $fbState.cuttingFilename = {
      name: $fbState.selectedFilename,
      scopedPath: `${$fbState.currentDir}/${$fbState.selectedFilename}`,
    };
  }
</script>

<button
  class="material-icons-round cut"
  on:click={cut}
  disabled={!$fbState.selectedFilename || $fbState.home}
>
  content_cut
</button>
