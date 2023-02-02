<script>
  import "../../../../css/desktop/apps/filebrowser/overlays/uploadingfile.css";
  import { FileBrowserUploadFile } from "../../../../ts/applogic/apps/FileBrowser/main";
  import Spinner from "../../../Spinner.svelte";
  import icon from "../../../../assets/apps/filemanager/upload.svg";
</script>

{#if $FileBrowserUploadFile}
  <div class="uploadingfile-wrapper">
    <div class="icon"><img src={icon} alt="" /></div>
    <div class="caption">
      Uploading {$FileBrowserUploadFile.name}...
    </div>
    <div class="spin"><Spinner height={30} /></div>
  </div>
  <table class="openfile-details">
    <tr>
      <td class="key">Name</td>
      <td>{$FileBrowserUploadFile.name}</td>
    </tr>
    <tr>
      <td class="key">Path</td>
      <td>{$FileBrowserUploadFile.path}</td>
    </tr>
    <tr>
      <td class="key">Mimetype</td>
      <td>{$FileBrowserUploadFile.mime}</td>
    </tr>
  </table>
{/if}
