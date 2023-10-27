<script lang="ts">
  import "../../../../css/desktop/apps/filebrowser/overlays/openingfile.css";
  import { abortFileReader } from "../../../../ts/api/fs/file";
  import { formatBytes } from "../../../../ts/api/fs/sizes";
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { MemoryIcon } from "../../../../ts/icon/general";
  import { hideOverlay } from "../../../../ts/window/overlay";
  import Spinner from "../../../Spinner.svelte";

  function abort() {
    abortFileReader.set(true);

    hideOverlay("openingFile", "FileManager");
  }
</script>

{#if $fbState.openingFile}
  <div class="openingfile-wrapper">
    <div class="icon"><img src={MemoryIcon} alt="" /></div>
    <div class="caption">
      Downloading {$fbState.openingFile.filename} to RAM...
    </div>
    <div class="spin"><Spinner height={30} /></div>
  </div>
  <table class="openfile-details">
    <tr>
      <td class="key">Name</td>
      <td>{$fbState.openingFile.filename}</td>
    </tr>
    <tr>
      <td class="key">Path</td>
      <td>{$fbState.openingFile.filename}</td>
    </tr>
    <tr>
      <td class="key">Mimetype</td>
      <td>{$fbState.openingFile.mime}</td>
    </tr>
    <tr>
      <td class="key">Size</td>
      <td>{formatBytes($fbState.openingFile.size)}</td>
    </tr>
  </table>
{/if}
<button class="cancel" on:click={abort}> Cancel </button>
