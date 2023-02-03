<script lang="ts">
  import icon from "../../../../assets/apps/logger/clear.svg";
  import "../../../../css/desktop/apps/filebrowser/overlays/deletingfile.css";
  import { FileBrowserDeletingFilename } from "../../../../ts/applogic/apps/FileBrowser/main";
  import Spinner from "../../../Spinner.svelte";
</script>

<div class="deletingfile-wrapper">
  <div class="icon"><img src={icon} alt="" /></div>
  <div class="caption">
    Deleting {$FileBrowserDeletingFilename}...
  </div>
  <div class="spin"><Spinner height={30} /></div>
</div>
