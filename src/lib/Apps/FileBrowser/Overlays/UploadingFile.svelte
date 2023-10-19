<script lang="ts">
  import "../../../../css/desktop/apps/filebrowser/overlays/uploadingfile.css";
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { UploadIcon } from "../../../../ts/icon/general";
  import ApiReveal from "../../../APIReveal.svelte";
</script>

{#if $fbState.uploadFile}
  <div class="uploadingfile-wrapper">
    <div class="icon"><img src={UploadIcon} alt="" /></div>
    <div class="caption">
      Uploading {$fbState.uploadFile.name}...
    </div>
  </div>
  <div class="progress-wrapper">
    <div class="progress">
      <div
        class="inner"
        style="width: {Math.floor($fbState.uploadProgress)}%"
      />
    </div>
    <div class="percentage">{$fbState.uploadProgress.toFixed(0)}%</div>
  </div>
  <table class="openfile-details">
    <tr>
      <td class="key">Path</td>
      <td>{$fbState.uploadFile.path}</td>
    </tr>
    <tr>
      <td class="key">Type</td>
      <td>{$fbState.uploadFile.mime}</td>
    </tr>
    <tr>
      <td class="key">Target</td>
      <td><ApiReveal /></td>
    </tr>
  </table>
{/if}
