<script lang="ts">
  import {
    FileBrowserCurrentDir,
    FileBrowserDirContents,
  } from "../../../ts/applogic/apps/FileBrowser/main";
</script>

{#if $FileBrowserDirContents}
  <div class="bottom">
    <div class="section">
      {$FileBrowserCurrentDir || "./"}
    </div>
    <div class="section">
      {$FileBrowserDirContents.name}
    </div>
    <div class="right">
      <div class="section">
        {$FileBrowserDirContents.files.length} Files
      </div>
      <div class="section">
        {$FileBrowserDirContents.directories.length} Folders
      </div>
    </div>
  </div>
{/if}
