<script lang="ts">
  import { FileBrowserOpeningFile } from "../../../../ts/applogic/apps/FileBrowser/main";
  import "../../../../css/desktop/apps/filebrowser/overlays/openingfile.css";
  import { abortFileReader } from "../../../../ts/api/fs/file";
  import { formatBytes } from "../../../../ts/api/fs/sizes";
  import { MemoryIcon } from "../../../../ts/icon/general";
  import { hideOverlay } from "../../../../ts/window/overlay";
  import Spinner from "../../../Spinner.svelte";

  function abort() {
    abortFileReader.set(true);

    hideOverlay("openingFile", "FileManager");
  }
</script>

{#if $FileBrowserOpeningFile}
  <div class="openingfile-wrapper">
    <div class="icon"><img src={MemoryIcon} alt="" /></div>
    <div class="caption">
      Downloading {$FileBrowserOpeningFile.filename} to RAM...
    </div>
    <div class="spin"><Spinner height={30} /></div>
  </div>
  <table class="openfile-details">
    <tr>
      <td class="key">Name</td>
      <td>{$FileBrowserOpeningFile.filename}</td>
    </tr>
    <tr>
      <td class="key">Path</td>
      <td>{$FileBrowserOpeningFile.filename}</td>
    </tr>
    <tr>
      <td class="key">Mimetype</td>
      <td>{$FileBrowserOpeningFile.mime}</td>
    </tr>
    <tr>
      <td class="key">Size</td>
      <td>{formatBytes($FileBrowserOpeningFile.size)}</td>
    </tr>
  </table>
{/if}
<button class="cancel" on:click={abort}> Cancel </button>
