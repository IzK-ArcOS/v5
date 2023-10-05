<script lang="ts">
  import {
    FileBrowserCurrentDir,
    FileBrowserDirContents,
    FileBrowserHome,
  } from "../../../ts/applogic/apps/FileBrowser/main";
  import { UserName } from "../../../ts/userlogic/interfaces";
</script>

{#if $FileBrowserDirContents}
  <div class="bottom">
    {#if !$FileBrowserHome}
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
    {:else}
      <div class="section">Home</div>
      <div class="right">
        <div class="section">{$UserName}</div>
      </div>
    {/if}
  </div>
{/if}
