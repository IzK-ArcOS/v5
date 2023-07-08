<script lang="ts">
  import icon from "../../../../assets/apps/filemanager/upload.svg";
  import "../../../../css/desktop/apps/filebrowser/overlays/uploadingfile.css";
  import { getServer } from "../../../../ts/api/server";
  import {
    FileBrowserUploadFile,
    FileBrowserUploadProgress,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import ApiReveal from "../../../APIReveal.svelte";
</script>

{#if $FileBrowserUploadFile}
  <div class="uploadingfile-wrapper">
    <div class="icon"><img src={icon} alt="" /></div>
    <div class="caption">
      Uploading {$FileBrowserUploadFile.name}...
    </div>
  </div>
  <div class="progress-wrapper">
    <div class="progress">
      <div
        class="inner"
        style="width: {Math.floor($FileBrowserUploadProgress)}%"
      />
    </div>
    <div class="percentage">{$FileBrowserUploadProgress.toFixed(0)}%</div>
  </div>
  <table class="openfile-details">
    <tr>
      <td class="key">Path</td>
      <td>{$FileBrowserUploadFile.path}</td>
    </tr>
    <tr>
      <td class="key">Type</td>
      <td>{$FileBrowserUploadFile.mime}</td>
    </tr>
    <tr>
      <td class="key">Target</td>
      <td><ApiReveal /></td>
    </tr>
  </table>
{/if}
